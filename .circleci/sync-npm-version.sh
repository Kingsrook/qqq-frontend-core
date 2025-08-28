#!/bin/bash
set -e

#######################################################
## NPM Version Synchronization Script for qqq-frontend-core
## 
## This script automatically updates package.json version based on the
## current GitFlow branch and versioning policy. It ensures version
## consistency across different branch types.
## 
## Branch Versioning Rules:
## • main      → Release version (e.g., 1.0.0)
## • develop   → Snapshot version (e.g., 1.0.127-SNAPSHOT)
## • release/* → Release candidate (e.g., 1.0.0-RC.1)
## • hotfix/*  → Patch version (e.g., 1.0.1)
## • feature/* → Snapshot version (e.g., 1.0.128-SNAPSHOT)
## 
## Usage:
##   ./sync-npm-version.sh          # Update version normally
##   ./sync-npm-version.sh --dry-run # Preview changes without applying
## 
## Author: Kingsrook Development Team
## Version: 1.0.0
#######################################################

#######################################################
## CONFIGURATION
#######################################################
PACKAGE_JSON="package.json"
DRY_RUN=false

#######################################################
## ARGUMENT PARSING
#######################################################
if [[ "$1" == "--dry-run" ]]; then
    DRY_RUN=true
    echo "DRY RUN MODE - No changes will be made"
fi

#######################################################
## BRANCH DETECTION
#######################################################
# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

#######################################################
## VERSION EXTRACTION
#######################################################
# Get current NPM version
NPM_VERSION=$(grep '"version"' $PACKAGE_JSON | sed 's/.*"version": "//;s/".*//')
echo "Current NPM version: $NPM_VERSION"

#######################################################
## VERSION CALCULATION
#######################################################
# Determine target version based on GitFlow branch
if [[ "$CURRENT_BRANCH" == "main" ]]; then
    # Main branch - check if we just merged a release branch
    # Look for recent release branch merges
    RECENT_RELEASE_MERGE=$(git log --oneline -5 --grep="Merge branch" | grep "release/" || true)
    
    if [[ -n "$RECENT_RELEASE_MERGE" ]]; then
        # We just merged a release branch, extract the version from the merge
        RELEASE_VERSION=$(echo "$RECENT_RELEASE_MERGE" | grep -o 'release/[0-9]\+\.[0-9]\+\.[0-9]\+' | head -1 | sed 's/release\///')
        if [[ -n "$RELEASE_VERSION" ]]; then
            TARGET_VERSION="$RELEASE_VERSION"
            echo "Main branch detected - using release version from merge: $TARGET_VERSION"
        else
            # Cannot parse release version - this is an error
            echo "❌ ERROR: Detected release branch merge but cannot parse version from: $RECENT_RELEASE_MERGE"
            echo "Expected format: 'Merge branch release/X.Y.Z'"
            exit 1
        fi
    else
        # No recent release merge detected - this is an error on main
        echo "❌ ERROR: No release branch merge detected on main branch"
        echo "Main branch should only receive merges from release branches"
        echo "Current git log (last 5 commits):"
        git log --oneline -5
        exit 1
    fi
elif [[ "$CURRENT_BRANCH" == "develop" ]]; then
    # Develop branch - should be a snapshot version (e.g., 1.0.127-SNAPSHOT)
    # Increment patch version for develop
    MAJOR_MINOR_PATCH=$(echo "$NPM_VERSION" | sed 's/-.*//')
    MAJOR_MINOR=$(echo "$MAJOR_MINOR_PATCH" | sed 's/\.[0-9]*$//')
    PATCH=$(echo "$MAJOR_MINOR_PATCH" | sed 's/.*\.//')
    NEW_PATCH=$((PATCH + 1))
    TARGET_VERSION="$MAJOR_MINOR.$NEW_PATCH-SNAPSHOT"
    echo "Develop branch detected - targeting snapshot version: $TARGET_VERSION"
elif [[ "$CURRENT_BRANCH" == release/* ]]; then
    # Release branch - should be a release candidate (e.g., 1.0.0-RC.1)
    RELEASE_VERSION=$(echo "$CURRENT_BRANCH" | sed 's/release\///')
    TARGET_VERSION="$RELEASE_VERSION-RC.1"
    echo "Release branch detected - targeting RC version: $TARGET_VERSION"
elif [[ "$CURRENT_BRANCH" == hotfix/* ]]; then
    # Hotfix branch - should be a patch version (e.g., 1.0.1)
    HOTFIX_VERSION=$(echo "$CURRENT_BRANCH" | sed 's/hotfix\///')
    TARGET_VERSION="$HOTFIX_VERSION"
    echo "Hotfix branch detected - targeting patch version: $TARGET_VERSION"
else
    # Feature branch - should be a snapshot version
    MAJOR_MINOR_PATCH=$(echo "$NPM_VERSION" | sed 's/-.*//')
    MAJOR_MINOR=$(echo "$MAJOR_MINOR_PATCH" | sed 's/\.[0-9]*$//')
    PATCH=$(echo "$MAJOR_MINOR_PATCH" | sed 's/.*\.//')
    NEW_PATCH=$((PATCH + 1))
    TARGET_VERSION="$MAJOR_MINOR.$NEW_PATCH-SNAPSHOT"
    echo "Feature branch detected - targeting snapshot version: $TARGET_VERSION"
fi

echo "Target version: $TARGET_VERSION"

#######################################################
## VERSION COMPARISON
#######################################################
if [[ "$NPM_VERSION" == "$TARGET_VERSION" ]]; then
    echo "✅ Versions are already synchronized"
    exit 0
fi

#######################################################
## DRY RUN HANDLING
#######################################################
if [[ "$DRY_RUN" == "true" ]]; then
    echo "DRY RUN: Would update package.json version from '$NPM_VERSION' to '$TARGET_VERSION'"
    echo "Command: sed -i 's/\"version\": \"$NPM_VERSION\"/\"version\": \"$TARGET_VERSION\"/' $PACKAGE_JSON"
    exit 0
fi

#######################################################
## VERSION UPDATE
#######################################################
echo "Updating package.json version from '$NPM_VERSION' to '$TARGET_VERSION'"

# Update version in package.json (macOS compatible)
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/\"version\": \"$NPM_VERSION\"/\"version\": \"$TARGET_VERSION\"/" $PACKAGE_JSON
else
    sed -i "s/\"version\": \"$NPM_VERSION\"/\"version\": \"$TARGET_VERSION\"/" $PACKAGE_JSON
fi

#######################################################
## VERIFICATION
#######################################################
# Verify the update
ACTUAL_NPM_VERSION=$(grep '"version"' $PACKAGE_JSON | sed 's/.*"version": "//;s/".*//')
if [[ "$ACTUAL_NPM_VERSION" == "$TARGET_VERSION" ]]; then
    echo "✅ NPM version successfully updated to: $ACTUAL_NPM_VERSION"
else
    echo "❌ NPM version update failed. Expected: $TARGET_VERSION, Got: $ACTUAL_NPM_VERSION"
    exit 1
fi

#######################################################
## COMPLETION SUMMARY
#######################################################
echo ""
echo "=== NPM version synchronization complete ==="
echo "Previous: $NPM_VERSION"
echo "Current:  $ACTUAL_NPM_VERSION"
echo "Branch:   $CURRENT_BRANCH"

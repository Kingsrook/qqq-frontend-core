# QQQ Frontend Core

[![Version](https://img.shields.io/badge/version-1.0.128-blue.svg)](https://github.com/Kingsrook/qqq-frontend-core)
[![License](https://img.shields.io/badge/license-GNU%20Affero%20GPL%20v3-green.svg)](https://www.gnu.org/licenses/agpl-3.0.en.html)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.4.4-blue.svg)](https://www.typescriptlang.org/)
[![NPM Package](https://img.shields.io/badge/npm-%40qrunio%2Fqqq--frontend--core-red.svg)](https://www.npmjs.com/package/@qrunio/qqq-frontend-core)

> **Core Frontend Library for QQQ - Low-code Application Framework for Engineers**

A TypeScript/JavaScript library that provides the core client-side functionality for interacting with QQQ backend servers. This library is framework-agnostic and can be used in any JavaScript environment, including React, Vue, Angular, or vanilla JavaScript applications.

## 🚀 Overview

QQQ Frontend Core is the **foundational library** that enables frontend applications to communicate with QQQ backend servers. It provides:

- **HTTP Client**: Axios-based HTTP client for QQQ API interactions
- **Data Models**: TypeScript interfaces and classes for QQQ data structures
- **Controllers**: High-level abstractions for common QQQ operations
- **Exception Handling**: Standardized error handling for QQQ operations
- **Authentication**: Built-in authentication management and token handling

### What This Repository Contains

- **Core Library**: TypeScript/JavaScript library for QQQ client operations
- **Data Models**: Complete type definitions for QQQ metadata and data structures
- **HTTP Controllers**: Controllers for interacting with QQQ backend APIs
- **Exception Classes**: Standardized error handling for QQQ operations
- **Type Definitions**: Full TypeScript support with strict typing

### What This Repository Does NOT Contain

- **QQQ Server**: The actual low-code engine and backend
- **UI Components**: Visual components or user interface elements
- **Framework Bindings**: React, Vue, or Angular specific implementations
- **Business Logic**: Application-specific business rules or processes

## 🏗️ Architecture

### Technology Stack

- **Language**: TypeScript with strict typing
- **HTTP Client**: Axios for HTTP requests
- **Build Tool**: TypeScript compiler with ES modules
- **Testing**: Jest with TypeScript support
- **Linting**: ESLint with TypeScript rules

### Core Dependencies

- **axios**: HTTP client for API communication
- **form-data**: Form data handling for file uploads
- **TypeScript**: Type safety and modern JavaScript features

### Development Dependencies

- **jest**: Testing framework
- **eslint**: Code quality and style enforcement
- **typescript**: TypeScript compiler and tools

## 📁 Project Structure

```
src/
├── controllers/           # HTTP controllers for QQQ operations
│   ├── QController.ts    # Main controller for QQQ interactions
│   └── QControllerV1.ts # Version 1 controller implementation
├── model/                # Data models and type definitions
│   ├── metaData/         # QQQ metadata models
│   │   ├── QInstance.ts  # QQQ instance metadata
│   │   ├── QTableMetaData.ts # Table structure definitions
│   │   ├── QProcessMetaData.ts # Process definitions
│   │   ├── QAppMetaData.ts # Application metadata
│   │   └── ...          # Other metadata models
│   ├── query/            # Query and filter models
│   ├── processes/        # Process execution models
│   ├── QRecord.ts        # Data record model
│   └── QPossibleValue.ts # Possible value model
├── exceptions/            # Exception handling
│   └── QException.ts     # Standard QQQ exception class
└── qqq-frontend-core.ts  # Main library entry point
```

## 🎯 Core Functionality

### HTTP Controllers

The library provides high-level controllers for common QQQ operations:

```typescript
import { QController } from '@qrunio/qqq-frontend-core';

const controller = new QController('https://your-qqq-server.com');

// Load metadata
const metadata = await controller.loadMetaData();

// Query records
const records = await controller.queryRecords('tableName', filters);

// Execute processes
const result = await controller.executeProcess('processName', parameters);
```

### Data Models

Complete TypeScript models for all QQQ data structures:

```typescript
import { 
  QInstance, 
  QTableMetaData, 
  QProcessMetaData 
} from '@qrunio/qqq-frontend-core';

// Instance metadata
const instance: QInstance = new QInstance(rawData);

// Table metadata
const table: QTableMetaData = new QTableMetaData(tableData);

// Process metadata
const process: QProcessMetaData = new QProcessMetaData(processData);
```

### Exception Handling

Standardized error handling for QQQ operations:

```typescript
import { QException } from '@qrunio/qqq-frontend-core';

try {
  const result = await controller.executeProcess('processName', params);
} catch (error) {
  if (error instanceof QException) {
    console.error(`QQQ Error: ${error.message} (Status: ${error.status})`);
  }
}
```

## 🚀 Getting Started

### Installation

```bash
npm install @qrunio/qqq-frontend-core
```

### Basic Usage

```typescript
import { QController } from '@qrunio/qqq-frontend-core';

// Create controller instance
const controller = new QController('https://your-qqq-server.com');

// Set authentication (if required)
controller.setAuthorizationHeaderValue('Bearer your-token');

// Load QQQ instance metadata
const metadata = await controller.loadMetaData();

// Query records from a table
const records = await controller.queryRecords('users', {
  filters: [{ field: 'active', operator: '=', value: true }],
  limit: 100
});

// Execute a process
const result = await controller.executeProcess('sendNotification', {
  userId: 123,
  message: 'Hello World'
});
```

### Advanced Usage

```typescript
// Custom exception handler
const controller = new QController('https://your-qqq-server.com', (error) => {
  console.error('Custom error handling:', error);
  // Handle error appropriately
});

// Set custom timeout
controller.setStepTimeoutMillis(120000); // 2 minutes

// Handle authentication
controller.setAuthenticationMetaData({
  type: 'OAUTH2',
  clientId: 'your-client-id',
  // ... other auth config
});
```

## 🔧 Configuration

### Environment Setup

```typescript
// Development
const controller = new QController('http://localhost:8080');

// Production
const controller = new QController('https://api.yourdomain.com');

// With custom configuration
const controller = new QController('https://api.yourdomain.com', {
  timeout: 30000,
  headers: {
    'X-Custom-Header': 'value'
  }
});
```

### Authentication Configuration

```typescript
// OAuth2
controller.setAuthenticationMetaData({
  type: 'OAUTH2',
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  authorizationUrl: 'https://auth.yourdomain.com/oauth2/authorize',
  tokenUrl: 'https://auth.yourdomain.com/oauth2/token'
});

// Custom token
controller.setAuthorizationHeaderValue('Bearer your-jwt-token');
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure

- **Unit Tests**: Individual component testing
- **Integration Tests**: Controller and model testing
- **Mock Data**: Comprehensive test fixtures

## 📦 Building for Production

### Build Process

```bash
# Clean and build
npm run clean-and-install
npm run prepublishOnly
```

The build process:
- Compiles TypeScript to JavaScript
- Generates ES modules and CommonJS outputs
- Creates optimized production bundles
- Generates type definitions

### Output Files

- **lib/**: Compiled JavaScript files
- **qqq-frontend-core.js**: CommonJS bundle
- **qqq-frontend-core.esm.js**: ES module bundle
- **Type definitions**: Full TypeScript support

## 🔐 Authentication

### Supported Authentication Methods

1. **OAuth2**: Standard OAuth2 flow
2. **Custom Tokens**: JWT or other token-based auth
3. **API Keys**: Simple API key authentication

### Authentication Flow

```typescript
// OAuth2 flow
await controller.authenticateOAuth2({
  username: 'user@example.com',
  password: 'password'
});

// Custom token
controller.setAuthorizationHeaderValue('Bearer token');

// Check authentication status
const isAuthenticated = controller.isAuthenticated();
```

## 📊 Data Management

### Record Operations

```typescript
// Create record
const newRecord = await controller.createRecord('users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Update record
const updatedRecord = await controller.updateRecord('users', 123, {
  name: 'John Smith'
});

// Delete record
await controller.deleteRecord('users', 123);

// Query records
const records = await controller.queryRecords('users', {
  filters: [{ field: 'active', operator: '=', value: true }],
  sort: [{ field: 'name', direction: 'ASC' }],
  limit: 50,
  offset: 0
});
```

### Process Execution

```typescript
// Execute process
const result = await controller.executeProcess('sendEmail', {
  to: 'user@example.com',
  subject: 'Welcome',
  body: 'Welcome to our platform!'
});

// Monitor process status
const status = await controller.getProcessStatus('process-id');

// Cancel process
await controller.cancelProcess('process-id');
```

## 🎨 Integration Examples

### React Integration

```typescript
import React, { useEffect, useState } from 'react';
import { QController, QInstance } from '@qrunio/qqq-frontend-core';

function QQQApp() {
  const [metadata, setMetadata] = useState<QInstance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new QController('https://your-qqq-server.com');
    
    controller.loadMetaData()
      .then(setMetadata)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!metadata) return <div>No metadata available</div>;

  return (
    <div>
      <h1>QQQ Application</h1>
      <p>Tables: {metadata.tables?.size || 0}</p>
      <p>Processes: {metadata.processes?.size || 0}</p>
    </div>
  );
}
```

### Vue Integration

```typescript
import { defineComponent, ref, onMounted } from 'vue';
import { QController, QInstance } from '@qrunio/qqq-frontend-core';

export default defineComponent({
  setup() {
    const metadata = ref<QInstance | null>(null);
    const loading = ref(true);

    onMounted(async () => {
      const controller = new QController('https://your-qqq-server.com');
      
      try {
        metadata.value = await controller.loadMetaData();
      } finally {
        loading.value = false;
      }
    });

    return { metadata, loading };
  }
});
```

### Vanilla JavaScript

```javascript
import { QController } from '@qrunio/qqq-frontend-core';

const controller = new QController('https://your-qqq-server.com');

// Load metadata
controller.loadMetaData()
  .then(metadata => {
    console.log('Tables:', metadata.tables);
    console.log('Processes:', metadata.processes);
  })
  .catch(error => {
    console.error('Error loading metadata:', error);
  });
```

## 🚀 Performance

### Optimization Features

- **Memoization**: Cached metadata promises
- **Connection Reuse**: Persistent HTTP connections
- **Batch Operations**: Efficient bulk operations
- **Lazy Loading**: On-demand metadata loading

### Best Practices

- **Reuse Controllers**: Don't create new controllers unnecessarily
- **Cache Metadata**: Use cached metadata when possible
- **Handle Errors**: Implement proper error handling
- **Monitor Performance**: Track API response times

## 🤝 Contributing

**Important**: This repository is a core component of the QQQ framework. All contributions, issues, and discussions should go through the main QQQ repository.

### Development Workflow

1. **Fork the main QQQ repository**: https://github.com/Kingsrook/qqq
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** (including core library changes if applicable)
4. **Run tests**: `npm test`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** to the main QQQ repository

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and style enforcement
- **Testing**: Comprehensive test coverage
- **Documentation**: Clear API documentation

## 📄 License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

```
QQQ Frontend Core
Copyright (C) 2021-2022 Kingsrook, LLC
651 N Broad St Ste 205 # 6917 | Middletown DE 19709 | United States
contact@kingsrook.com | https://github.com/Kingsrook/
```

**Note**: This is a core component of the QQQ framework. For the complete license and more information, see the main QQQ repository: https://github.com/Kingsrook/qqq

## 🆘 Support & Community

### ⚠️ Important: Use Main QQQ Repository

**All support, issues, discussions, and community interactions should go through the main QQQ repository:**

- **Main Repository**: https://github.com/Kingsrook/qqq
- **Issues**: https://github.com/Kingsrook/qqq/issues
- **Discussions**: https://github.com/Kingsrook/qqq/discussions
- **Wiki**: https://github.com/Kingsrook/qqq.wiki

### Why This Repository Exists

This repository is maintained separately from the main QQQ repository to:
- **Enable independent library development** and versioning
- **Allow library-specific CI/CD** and deployment pipelines
- **Provide clear separation** between core library and framework concerns
- **Support different release cycles** for library vs. framework updates

### Getting Help

- **Documentation**: Check the [QQQ Wiki](https://github.com/Kingsrook/qqq.wiki)
- **Issues**: Report bugs and feature requests on [Main QQQ Issues](https://github.com/Kingsrook/qqq/issues)
- **Discussions**: Join community discussions on [Main QQQ Discussions](https://github.com/Kingsrook/qqq/discussions)
- **Questions**: Ask questions in the main QQQ repository

### Contact Information

- **Company**: Kingsrook, LLC
- **Email**: contact@kingsrook.com
- **Website**: https://kingsrook.com
- **Main GitHub**: https://github.com/Kingsrook/qqq

## 🙏 Acknowledgments

- **TypeScript Team**: For the powerful type system
- **Axios Team**: For the excellent HTTP client library
- **QQQ Framework Team**: For the underlying low-code platform
- **Open Source Community**: For the tools and libraries that make this possible

---

**Built with ❤️ by the Kingsrook Team**

**This is a core library component of the QQQ framework. For complete information, support, and community, visit: https://github.com/Kingsrook/qqq**


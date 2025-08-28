# Contributing to QQQ Frontend Core

Thank you for your interest in contributing to the QQQ Frontend Core! This repository contains the **core frontend library** that provides the foundation for QQQ client applications.

## 🎯 What This Repository Is

This repository is a **core library component** of the QQQ framework that provides:
- HTTP client functionality for QQQ backend communication
- TypeScript data models and interfaces
- Controllers for QQQ operations
- Exception handling and error management
- Core library utilities and helpers

## 🚫 What This Repository Is NOT

This repository does NOT contain:
- The QQQ server or backend
- UI components or user interfaces
- Application-specific business logic
- Framework-specific implementations
- Database operations or API endpoints

## 🔄 Contribution Types

### ✅ Core Library Changes (This Repository)

- **HTTP client improvements** and optimizations
- **Data model enhancements** and type definitions
- **Controller functionality** updates
- **Exception handling** improvements
- **Performance optimizations** for library operations
- **TypeScript type** improvements and fixes
- **Documentation updates** for library APIs

### ❌ Backend/Core Changes (Main QQQ Repository)

- **Server-side functionality**
- **Core framework features**
- **Database schema changes**
- **API endpoint modifications**
- **Business logic changes**
- **Process engine updates**

## 🚀 Getting Started

### Prerequisites

- **Node.js**: LTS version (16.x or higher)
- **npm**: 8.x or higher
- **Git**: For version control
- **QQQ Server**: Running instance for testing

### Development Setup

1. **Fork this repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/qqq-frontend-core.git
   cd qqq-frontend-core
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Use strict typing and modern features
- **ESLint**: Follow the configured rules
- **Naming**: Use descriptive names for functions and variables
- **Documentation**: Add JSDoc comments for public APIs
- **Testing**: Write comprehensive tests for new functionality

### Library Structure

```typescript
// Example controller method
export class QController {
  /**
   * Executes a QQQ process with the given parameters
   * @param processName - The name of the process to execute
   * @param parameters - The parameters to pass to the process
   * @returns Promise containing the process result
   */
  public async executeProcess(processName: string, parameters: any): Promise<any> {
    // Implementation
  }
}
```

### Testing

- **Unit Tests**: Test individual methods and classes
- **Integration Tests**: Test controller interactions
- **Type Tests**: Ensure TypeScript types are correct
- **Mock Data**: Use comprehensive test fixtures

## 🔄 Pull Request Process

1. **Ensure your changes are library-focused only**
2. **Follow the existing code patterns**
3. **Add tests for new functionality**
4. **Update documentation if needed**
5. **Test thoroughly with QQQ backend**
6. **Submit a pull request**

### PR Checklist

- [ ] Changes are core library-focused only
- [ ] Code follows existing patterns
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No breaking changes introduced
- [ ] TypeScript compilation succeeds
- [ ] ESLint validation passes

## 🚨 For Major Changes

If your contribution involves:
- **Core framework functionality**
- **Backend integration changes**
- **Major architectural decisions**
- **Breaking changes to the QQQ API**
- **New QQQ features or capabilities**

Please submit to the **main QQQ repository** instead:
👉 **[https://github.com/Kingsrook/qqq](https://github.com/Kingsrook/qqq)**

## 🐛 Reporting Issues

**All issues should be reported to the main QQQ repository:**
👉 **[https://github.com/Kingsrook/qqq/issues](https://github.com/Kingsrook/qqq/issues)**

When reporting library-specific issues, include:
- Node.js version
- Operating system
- QQQ version
- Steps to reproduce
- Code examples
- Error messages and stack traces

## 💬 Getting Help

- **Documentation**: [QQQ Wiki](https://github.com/Kingsrook/qqq.wiki)
- **Discussions**: [QQQ Discussions](https://github.com/Kingsrook/qqq/discussions)
- **Main Repository**: [https://github.com/Kingsrook/qqq](https://github.com/Kingsrook/qqq)

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (GNU Affero General Public License v3.0).

## 🙏 Thank You

Thank you for contributing to the QQQ Frontend Core! Your contributions help make the QQQ framework's client library better for everyone.

---

**Remember**: This is a core library component. For core QQQ functionality, use the main repository: https://github.com/Kingsrook/qqq

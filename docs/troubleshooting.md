# 🔧 Troubleshooting Guide

This comprehensive troubleshooting guide helps you resolve common issues when developing or deploying the LifeSmart Calculator application.

## Table of Contents

- [Quick Fixes](#quick-fixes)
- [Development Issues](#development-issues)
- [Build Issues](#build-issues)
- [Runtime Issues](#runtime-issues)
- [Performance Issues](#performance-issues)
- [Deployment Issues](#deployment-issues)
- [Browser Compatibility](#browser-compatibility)
- [Debugging Tools](#debugging-tools)
- [Common Error Messages](#common-error-messages)
- [Getting Help](#getting-help)

---

## Quick Fixes

### Most Common Solutions

#### 1. Clear Cache and Reinstall
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Start development server
npm start
```

#### 2. Reset Development Environment
```bash
# Stop development server (Ctrl+C)
# Clear browser cache
# Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
# Restart development server
npm start
```

#### 3. Check Node.js Version
```bash
# Check Node.js version
node --version
# Should be 18.0.0 or higher

# Check npm version
npm --version
# Should be 8.0.0 or higher
```

---

## Development Issues

### 1. Development Server Won't Start

#### Problem: Port 3000 is already in use
```bash
# Error: Something is already running on port 3000
```

**Solutions:**
```bash
# Option 1: Kill process on port 3000
npx kill-port 3000

# Option 2: Use different port
PORT=3001 npm start

# Option 3: Find and kill the process
lsof -ti:3000 | xargs kill -9
```

#### Problem: Module not found errors
```bash
# Error: Cannot resolve module 'react' or similar
```

**Solutions:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check if package.json is correct
npm list --depth=0

# Clear npm cache
npm cache clean --force
```

#### Problem: TypeScript errors
```bash
# Error: Type 'string' is not assignable to type 'number'
```

**Solutions:**
```bash
# Run type checking
npm run type-check

# Fix TypeScript errors
npm run lint:fix

# Check tsconfig.json
cat tsconfig.json
```

### 2. Hot Reload Not Working

#### Problem: Changes not reflecting in browser
```bash
# Changes made but browser doesn't update
```

**Solutions:**
```bash
# Check if hot reload is enabled
# Look for "webpack compiled" message in terminal

# Restart development server
npm start

# Clear browser cache
# Hard refresh (Ctrl+Shift+R)

# Check for syntax errors in console
# Fix any JavaScript/TypeScript errors
```

#### Problem: Webpack compilation errors
```bash
# Error: Module build failed
```

**Solutions:**
```bash
# Check for syntax errors
npm run lint

# Fix formatting issues
npm run format

# Check for missing dependencies
npm list --depth=0
```

### 3. VS Code Issues

#### Problem: TypeScript IntelliSense not working
```bash
# No autocomplete or type checking in VS Code
```

**Solutions:**
```bash
# Install TypeScript in workspace
npm install --save-dev typescript

# Reload VS Code window
# Ctrl+Shift+P -> "Developer: Reload Window"

# Check VS Code TypeScript version
# Ctrl+Shift+P -> "TypeScript: Select TypeScript Version"
# Choose "Use Workspace Version"
```

#### Problem: ESLint not working
```bash
# No linting errors shown in VS Code
```

**Solutions:**
```bash
# Install ESLint extension
# Check .vscode/settings.json
# Ensure ESLint is enabled

# Restart ESLint server
# Ctrl+Shift+P -> "ESLint: Restart ESLint Server"
```

---

## Build Issues

### 1. Build Failures

#### Problem: TypeScript compilation errors
```bash
# Error: Type error in src/components/Calculator.tsx
```

**Solutions:**
```bash
# Run type checking first
npm run type-check

# Fix TypeScript errors
npm run lint:fix

# Check for missing type definitions
npm install --save-dev @types/react @types/react-dom

# Rebuild
npm run build
```

#### Problem: ESLint errors
```bash
# Error: ESLint found problems in your code
```

**Solutions:**
```bash
# Fix ESLint errors
npm run lint:fix

# Check specific file
npx eslint src/components/Calculator.tsx

# Disable specific rule (temporary)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
```

#### Problem: Bundle size too large
```bash
# Error: Bundle size exceeds limit
```

**Solutions:**
```bash
# Analyze bundle size
npm run bundle-analyzer

# Check bundle size limits
npm run bundle-size

# Optimize imports
# Use dynamic imports for large libraries
import { debounce } from 'lodash/debounce';
```

### 2. Memory Issues

#### Problem: JavaScript heap out of memory
```bash
# Error: JavaScript heap out of memory
```

**Solutions:**
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Or set permanently
export NODE_OPTIONS="--max-old-space-size=4096"

# Check available memory
node -e "console.log(process.memoryUsage())"
```

### 3. Dependency Issues

#### Problem: Package conflicts
```bash
# Error: ERESOLVE could not resolve dependency
```

**Solutions:**
```bash
# Check for conflicting packages
npm ls

# Use --legacy-peer-deps
npm install --legacy-peer-deps

# Or use --force
npm install --force

# Update package-lock.json
rm package-lock.json
npm install
```

---

## Runtime Issues

### 1. Application Crashes

#### Problem: White screen of death
```bash
# Application loads but shows blank white screen
```

**Solutions:**
```bash
# Check browser console for errors
# Open Developer Tools (F12)
# Look for JavaScript errors

# Check if all dependencies are loaded
# Look for 404 errors in Network tab

# Verify build output
ls -la build/
cat build/index.html
```

#### Problem: Component not rendering
```bash
# Specific component not showing
```

**Solutions:**
```bash
# Check for JavaScript errors
# Look in browser console

# Verify component imports
# Check file paths and exports

# Add console.log for debugging
console.log('Component rendered');
```

### 2. State Management Issues

#### Problem: State not updating
```bash
# State changes but UI doesn't update
```

**Solutions:**
```bash
# Check if state is being mutated directly
# Use setState or functional updates

# Verify dependencies in useEffect
useEffect(() => {
  // Effect logic
}, [dependency]); // Check dependencies

# Use React DevTools to inspect state
```

#### Problem: Infinite re-renders
```bash
# Component keeps re-rendering
```

**Solutions:**
```bash
# Check for missing dependencies in useEffect
# Use useCallback for event handlers
# Use useMemo for expensive calculations

# Check for object/array dependencies
const memoizedValue = useMemo(() => {
  return { value: expensiveCalculation() };
}, [dependency]);
```

### 3. Chart Issues

#### Problem: Chart not rendering
```bash
# Chart.js component not showing
```

**Solutions:**
```bash
# Check if Chart.js is properly imported
import { Chart } from 'chart.js';

# Verify chart data format
console.log('Chart data:', chartData);

# Check for canvas element
const canvas = document.querySelector('canvas');
console.log('Canvas element:', canvas);

# Ensure chart container has dimensions
.chart-container {
  width: 100%;
  height: 400px;
}
```

#### Problem: Chart performance issues
```bash
# Chart rendering slowly or freezing
```

**Solutions:**
```bash
# Reduce data points
const limitedData = data.slice(0, 100);

# Use chart animation options
const options = {
  animation: {
    duration: 0 // Disable animations
  }
};

# Debounce chart updates
const debouncedUpdate = useCallback(
  debounce((newData) => {
    chart.data = newData;
    chart.update();
  }, 300),
  [chart]
);
```

---

## Performance Issues

### 1. Slow Loading

#### Problem: Application loads slowly
```bash
# Initial page load takes too long
```

**Solutions:**
```bash
# Analyze bundle size
npm run bundle-analyzer

# Check for large dependencies
npm list --depth=0

# Use code splitting
const LazyComponent = lazy(() => import('./LazyComponent'));

# Optimize images
# Use WebP format
# Implement lazy loading
```

#### Problem: Slow re-renders
```bash
# UI updates slowly when state changes
```

**Solutions:**
```bash
# Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive rendering */}</div>;
});

# Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);

# Use useCallback for event handlers
const handleClick = useCallback((id) => {
  // Handler logic
}, [dependency]);
```

### 2. Memory Leaks

#### Problem: Memory usage keeps growing
```bash
# Application memory usage increases over time
```

**Solutions:**
```bash
# Clean up event listeners
useEffect(() => {
  const handleResize = () => {
    // Resize logic
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

# Clean up timers
useEffect(() => {
  const timer = setInterval(() => {
    // Timer logic
  }, 1000);
  
  return () => {
    clearInterval(timer);
  };
}, []);

# Clean up subscriptions
useEffect(() => {
  const subscription = someService.subscribe();
  
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### 3. Bundle Size Issues

#### Problem: Bundle size too large
```bash
# Build output exceeds size limits
```

**Solutions:**
```bash
# Analyze bundle composition
npm run bundle-analyzer

# Check for duplicate dependencies
npm ls --depth=0

# Use dynamic imports
const HeavyComponent = lazy(() => import('./HeavyComponent'));

# Tree shake unused code
import { specificFunction } from 'large-library';
// Instead of: import * from 'large-library';

# Use smaller alternatives
# Replace moment.js with date-fns
# Replace lodash with specific functions
```

---

## Deployment Issues

### 1. Build Not Working

#### Problem: Build fails in CI/CD
```bash
# Error: Build failed in GitHub Actions
```

**Solutions:**
```bash
# Check build logs in GitHub Actions
# Look for specific error messages

# Test build locally
npm run build

# Check Node.js version in CI
# Ensure CI uses Node.js 18+

# Check environment variables
# Ensure all required env vars are set
```

#### Problem: Environment variables not working
```bash
# Error: process.env.REACT_APP_* is undefined
```

**Solutions:**
```bash
# Check variable naming
# Must start with REACT_APP_
REACT_APP_API_URL=https://api.example.com

# Check build-time vs runtime
# Environment variables are embedded at build time

# Verify in build output
grep -r "REACT_APP_" build/
```

### 2. Routing Issues

#### Problem: 404 errors on page refresh
```bash
# Error: 404 Not Found when refreshing page
```

**Solutions:**
```bash
# Configure server for SPA routing
# Nginx
location / {
  try_files $uri $uri/ /index.html;
}

# Apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

#### Problem: Assets not loading
```bash
# Error: 404 for static assets
```

**Solutions:**
```bash
# Check asset paths
# Ensure correct base path in package.json
"homepage": "https://your-domain.com/path"

# Check build output
ls -la build/static/

# Verify server configuration
# Ensure static files are served correctly
```

### 3. Performance in Production

#### Problem: Slow production performance
```bash
# Application performs poorly in production
```

**Solutions:**
```bash
# Run Lighthouse audit
npm run lighthouse

# Check Core Web Vitals
# First Contentful Paint < 1.5s
# Largest Contentful Paint < 2.5s
# Cumulative Layout Shift < 0.1

# Enable compression
# Gzip/Brotli compression on server

# Use CDN for static assets
# Serve assets from CDN
```

---

## Browser Compatibility

### 1. Modern Browsers

#### Supported Browsers
- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

#### Problem: Feature not working in specific browser
```bash
# Feature works in Chrome but not Safari
```

**Solutions:**
```bash
# Check browser compatibility
# Use caniuse.com for feature support

# Add polyfills for older browsers
npm install --save core-js

# Use feature detection
if ('IntersectionObserver' in window) {
  // Use IntersectionObserver
} else {
  // Fallback
}
```

### 2. Mobile Browsers

#### Problem: Layout issues on mobile
```bash
# UI breaks on mobile devices
```

**Solutions:**
```bash
# Check responsive design
# Use mobile-first approach

# Test on real devices
# Use browser dev tools mobile simulation

# Check viewport meta tag
<meta name="viewport" content="width=device-width, initial-scale=1.0">

# Use touch-friendly interactions
# Ensure buttons are at least 44px
```

### 3. Internet Explorer

#### Problem: Application doesn't work in IE
```bash
# Error: Application fails in Internet Explorer
```

**Solutions:**
```bash
# IE is not supported
# Minimum supported browser is Chrome 90+

# If IE support is required:
# Add polyfills
# Use Babel for transpilation
# Test thoroughly in IE
```

---

## Debugging Tools

### 1. Browser DevTools

#### Chrome DevTools
```bash
# Open DevTools
# F12 or Ctrl+Shift+I

# Console tab
# Check for JavaScript errors
# Use console.log for debugging

# Network tab
# Check for failed requests
# Monitor loading times

# Performance tab
# Profile application performance
# Identify bottlenecks

# Memory tab
# Check for memory leaks
# Monitor memory usage
```

#### React DevTools
```bash
# Install React DevTools extension
# Chrome: React Developer Tools
# Firefox: React Developer Tools

# Components tab
# Inspect component tree
# View props and state

# Profiler tab
# Profile component renders
# Identify performance issues
```

### 2. VS Code Debugging

#### Launch Configuration
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true
    }
  ]
}
```

#### Debugging Steps
```bash
# Set breakpoints in VS Code
# Click in gutter next to line numbers

# Start debugging
# F5 or Run > Start Debugging

# Step through code
# F10: Step over
# F11: Step into
# Shift+F11: Step out
```

### 3. Command Line Tools

#### Debug Commands
```bash
# Run with debug info
DEBUG=* npm start

# Build with verbose output
npm run build -- --verbose

# Test with coverage
npm test -- --coverage --watchAll=false

# Lint with detailed output
npm run lint -- --debug
```

---

## Common Error Messages

### 1. TypeScript Errors

#### Error: Cannot find module
```bash
# Error: Cannot find module 'react' or its corresponding type declarations
```

**Solution:**
```bash
# Install missing types
npm install --save-dev @types/react @types/react-dom

# Check import paths
import React from 'react';
```

#### Error: Type assignment
```bash
# Error: Type 'string' is not assignable to type 'number'
```

**Solution:**
```bash
# Fix type mismatch
const value: number = parseInt(stringValue, 10);

# Use type assertion
const value = stringValue as number;
```

### 2. React Errors

#### Error: Hooks order
```bash
# Error: Hooks can only be called inside the body of a function component
```

**Solution:**
```bash
# Move hooks to top level of component
# Don't call hooks inside loops or conditions
```

#### Error: Key prop
```bash
# Warning: Each child in a list should have a unique "key" prop
```

**Solution:**
```bash
# Add unique key to list items
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

### 3. Build Errors

#### Error: Module not found
```bash
# Error: Module not found: Can't resolve 'chart.js'
```

**Solution:**
```bash
# Install missing dependency
npm install chart.js

# Check import statement
import { Chart } from 'chart.js';
```

#### Error: Bundle size
```bash
# Error: Bundle size exceeds limit
```

**Solution:**
```bash
# Analyze bundle
npm run bundle-analyzer

# Optimize imports
import { specificFunction } from 'large-library';
```

---

## Getting Help

### 1. Self-Help Resources

#### Documentation
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Chart.js Documentation](https://www.chartjs.org/docs)

#### Community Resources
- [Stack Overflow](https://stackoverflow.com)
- [React Community](https://reactjs.org/community)
- [TypeScript Community](https://www.typescriptlang.org/community)

### 2. Project-Specific Help

#### GitHub Issues
- [Report Bug](https://github.com/your-username/lifesmart-calculator/issues/new?template=bug_report.md)
- [Request Feature](https://github.com/your-username/lifesmart-calculator/issues/new?template=feature_request.md)
- [Ask Question](https://github.com/your-username/lifesmart-calculator/discussions)

#### Contact Information
- 📧 **Email**: support@lifesmart-calculator.com
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/lifesmart-calculator/discussions)
- 📚 **Documentation**: [Full Documentation](https://docs.lifesmart-calculator.com)

### 3. When to Ask for Help

#### Before Asking
1. **Check this guide** - Look for similar issues
2. **Search existing issues** - Check GitHub issues and discussions
3. **Try common solutions** - Clear cache, reinstall dependencies
4. **Check browser console** - Look for error messages
5. **Test in different browser** - Isolate browser-specific issues

#### When Asking for Help
1. **Provide error messages** - Copy exact error text
2. **Describe steps to reproduce** - What did you do before the error?
3. **Include system information** - OS, Node.js version, browser
4. **Share relevant code** - Minimal code that reproduces the issue
5. **Check if issue is already reported** - Search existing issues first

### 4. Emergency Support

#### Critical Issues
- **Security vulnerabilities** - Email security@lifesmart-calculator.com
- **Production outages** - Create urgent issue on GitHub
- **Data loss** - Contact support immediately

#### Response Times
- **Critical issues** - Within 4 hours
- **Bug reports** - Within 24 hours
- **Feature requests** - Within 48 hours
- **General questions** - Within 72 hours

---

## Prevention Tips

### 1. Best Practices

#### Code Quality
- **Write tests** - Unit, integration, and E2E tests
- **Use TypeScript** - Catch errors at compile time
- **Follow linting rules** - Consistent code style
- **Document code** - Clear comments and documentation

#### Performance
- **Profile regularly** - Use React DevTools Profiler
- **Monitor bundle size** - Check size limits
- **Optimize images** - Use appropriate formats and sizes
- **Use lazy loading** - Load components when needed

#### Security
- **Validate inputs** - Sanitize user data
- **Keep dependencies updated** - Regular security audits
- **Use HTTPS** - Secure data transmission
- **Follow OWASP guidelines** - Security best practices

### 2. Monitoring

#### Development
- **Use error boundaries** - Catch and handle errors gracefully
- **Log errors** - Track errors in development
- **Monitor performance** - Use React DevTools
- **Test regularly** - Run tests before committing

#### Production
- **Error tracking** - Use services like Sentry
- **Performance monitoring** - Track Core Web Vitals
- **Uptime monitoring** - Ensure application availability
- **User feedback** - Collect and act on user reports

---

## Conclusion

This troubleshooting guide covers the most common issues you might encounter when developing or deploying the LifeSmart Calculator. Remember:

1. **Start with quick fixes** - Clear cache, reinstall dependencies
2. **Check the logs** - Browser console, build output, CI/CD logs
3. **Use debugging tools** - React DevTools, VS Code debugger
4. **Search for solutions** - Check this guide, GitHub issues, Stack Overflow
5. **Ask for help** - When you've exhausted self-help options

For additional support, please refer to the [Development Guide](development.md) or create an issue on GitHub.

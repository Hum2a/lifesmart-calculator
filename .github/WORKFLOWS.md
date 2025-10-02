# 🚀 GitHub Workflows Documentation

This document describes the comprehensive CI/CD pipeline and automation workflows for the LifeSmart Calculator project.

## 📋 Overview

Our GitHub Actions workflows provide a complete development lifecycle automation system including:

- 🔍 **Code Quality & Testing** - Linting, formatting, type checking, and unit tests
- 🔒 **Security Scanning** - Vulnerability detection and dependency auditing
- 🚀 **Performance Monitoring** - Lighthouse CI, bundle analysis, and load testing
- 📦 **Dependency Management** - Automated updates and security patches
- 🚀 **Deployment** - Automated deployment to staging and production
- 📝 **Release Automation** - Automated versioning and changelog generation
- 🔍 **PR Validation** - Comprehensive pull request checks

## 🔧 Workflow Files

### 1. `ci.yml` - Main CI/CD Pipeline
**Triggers:** Push to main/develop, PRs, scheduled daily
**Duration:** ~15-20 minutes

**Features:**
- ✅ Code quality checks (ESLint, Prettier, TypeScript)
- ✅ Unit testing with coverage reporting
- ✅ Build verification
- ✅ Bundle size analysis
- ✅ Security scanning (npm audit, Snyk, CodeQL)
- ✅ Performance testing (Lighthouse CI)
- ✅ E2E testing (Playwright)
- ✅ Cross-browser testing
- ✅ Automated deployment
- ✅ Performance monitoring

### 2. `pr-validation.yml` - Pull Request Validation
**Triggers:** PR opened, synchronized, reopened
**Duration:** ~8-12 minutes

**Features:**
- ✅ Code quality validation
- ✅ Bundle size analysis
- ✅ Security checks
- ✅ Visual regression testing
- ✅ Automated PR comments with results

### 3. `release.yml` - Release Automation
**Triggers:** Git tags, manual dispatch
**Duration:** ~20-25 minutes

**Features:**
- ✅ Pre-release validation
- ✅ Smart changelog generation
- ✅ Production build
- ✅ GitHub release creation
- ✅ Automated deployment
- ✅ Post-release monitoring

### 4. `security.yml` - Security Scanning
**Triggers:** Daily schedule, push to main/develop, PRs
**Duration:** ~10-15 minutes

**Features:**
- ✅ Dependency security scanning
- ✅ Code security analysis (CodeQL)
- ✅ Secrets scanning (TruffleHog, GitLeaks)
- ✅ Web security headers check
- ✅ Security dashboard and alerts

### 5. `performance.yml` - Performance Monitoring
**Triggers:** Daily schedule, push to main/develop, PRs
**Duration:** ~15-20 minutes

**Features:**
- ✅ Lighthouse performance testing
- ✅ Bundle size analysis
- ✅ Load testing (Artillery, k6)
- ✅ Mobile performance testing
- ✅ Performance regression detection
- ✅ Performance alerts

### 6. `dependencies.yml` - Dependency Management
**Triggers:** Weekly schedule, manual dispatch
**Duration:** ~10-15 minutes

**Features:**
- ✅ Dependency update checking
- ✅ Automated update PRs
- ✅ Security updates
- ✅ Dependency health monitoring

## 🛠️ Configuration Files

### `.lighthouserc.json`
Lighthouse CI configuration for performance testing:
- Performance score threshold: 80%
- Accessibility score threshold: 90%
- Best practices score threshold: 90%
- SEO score threshold: 90%
- Core Web Vitals thresholds

### `.bundlesizerc.json`
Bundle size monitoring configuration:
- Main JS bundle: 150KB gzipped
- CSS bundle: 10KB gzipped
- CI tracking for main/develop branches

### `playwright.config.js`
E2E testing configuration:
- Multi-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile testing (iPhone, Android)
- Visual regression testing
- Accessibility testing

### `load-test.js`
Load testing script for k6:
- Ramp-up testing (10-20 users)
- Performance thresholds
- API endpoint testing

## 📊 Required Secrets

Add these secrets to your GitHub repository settings:

### Deployment Secrets
```
VERCEL_TOKEN          # Vercel deployment token
VERCEL_ORG_ID         # Vercel organization ID
VERCEL_PROJECT_ID     # Vercel project ID
NETLIFY_AUTH_TOKEN    # Netlify authentication token
NETLIFY_SITE_ID       # Netlify site ID
```

### Security Scanning
```
SNYK_TOKEN            # Snyk security scanning token
SEMGREP_APP_TOKEN     # Semgrep security analysis token
GITLEAKS_LICENSE      # GitLeaks license key
```

### Performance Monitoring
```
LHCI_GITHUB_APP_TOKEN # Lighthouse CI GitHub app token
```

## 🚀 Usage Examples

### Manual Release
```bash
# Create a new release
git tag v1.2.3
git push origin v1.2.3

# Or use the workflow dispatch
# Go to Actions > Release Automation > Run workflow
```

### Manual Dependency Update
```bash
# Check for updates
npm run deps:check

# Update dependencies
npm run deps:update

# Or use the workflow dispatch
# Go to Actions > Dependency Management > Run workflow
```

### Local Testing
```bash
# Run all quality checks
npm run pre-commit

# Run E2E tests
npm run test:e2e

# Run performance tests
npm run lighthouse

# Analyze bundle size
npm run bundle-size
```

## 📈 Monitoring & Alerts

### Success Criteria
- ✅ All tests pass
- ✅ No security vulnerabilities
- ✅ Performance scores meet thresholds
- ✅ Bundle size within limits
- ✅ No linting errors

### Failure Handling
- 🚨 Automatic issue creation for security failures
- 🚨 Performance alerts for regression
- 📝 Detailed PR comments with results
- 📊 Comprehensive dashboards and summaries

### Notifications
- 📧 Email notifications for critical failures
- 💬 PR comments with detailed results
- 📊 GitHub Actions summaries
- 🚨 Automatic issue creation for urgent issues

## 🔧 Customization

### Adding New Tests
1. Add test files to `tests/e2e/`
2. Update `playwright.config.js` if needed
3. Add new checks to relevant workflows

### Modifying Thresholds
1. Update `.lighthouserc.json` for performance
2. Update `.bundlesizerc.json` for bundle size
3. Modify workflow files for other thresholds

### Adding New Environments
1. Add environment secrets
2. Update deployment workflows
3. Configure environment-specific settings

## 📚 Best Practices

### Development Workflow
1. Create feature branch from `develop`
2. Make changes and test locally
3. Push to trigger PR validation
4. Review automated checks
5. Merge to `develop` when ready
6. Deploy to staging automatically

### Release Workflow
1. Merge `develop` to `main`
2. Create and push version tag
3. Automated release process runs
4. Production deployment happens
5. Monitor post-deployment metrics

### Security Workflow
1. Daily security scans run automatically
2. Review security dashboard regularly
3. Address vulnerabilities promptly
4. Use automated security updates when safe

## 🆘 Troubleshooting

### Common Issues

**Workflow Fails on Linting**
- Run `npm run lint:fix` locally
- Check ESLint configuration
- Review code style guidelines

**Performance Tests Fail**
- Check Lighthouse thresholds
- Optimize bundle size
- Review Core Web Vitals

**Security Scan Fails**
- Review vulnerability reports
- Update dependencies
- Check for exposed secrets

**Deployment Fails**
- Verify deployment secrets
- Check environment configuration
- Review deployment logs

### Getting Help
- 📖 Check workflow logs in GitHub Actions
- 🔍 Review configuration files
- 📝 Check this documentation
- 🐛 Create an issue for bugs

## 🎯 Future Enhancements

### Planned Features
- 🔄 Automated rollback on failure
- 📊 Advanced performance monitoring
- 🧪 Visual regression testing
- 🔐 Advanced security scanning
- 📱 Mobile-specific testing
- 🌐 Multi-environment deployment

### Contributing
To improve the workflows:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

*This documentation is automatically updated with each workflow change.*

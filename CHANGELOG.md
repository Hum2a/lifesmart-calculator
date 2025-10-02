# Changelog

All notable changes to the LifeSmart Calculator project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### ✨ Added
- N/A

### 🔧 Changed
- N/A

### 🐛 Fixed
- N/A

---

### [v1.0.0] - 2025-10-02

### ✨ Added New features and enhancements
- Update project to version 1.0.0 with comprehensive configuration and assets. Added essential files including .htaccess for server settings, browserconfig.xml, favicon, index.html, manifest.json, privacy policy, terms of service, and sitemap. Enhanced project metadata in package.json for better visibility and organization. `+463, -2`
- Refactor App component to use CreditCardCalculator and add custom styles for sliders and input fields. Introduce CreditCardCalculator component with functionality for calculating credit card interest and investment growth over time. `+339, -26`
- Update package dependencies and version to 1.0.0. Added chart.js and react-chartjs-2 for enhanced charting capabilities, and included license information for new dependencies. `+44, -3`
- Integrate InvestmentChart component into CreditCardCalculator for visualizing investment growth. Remove unused investment calculation logic from CreditCardCalculator and streamline input handling. Update UI elements for clarity and organization. `+246, -62`
- Refactor CreditCardCalculator to handle null values for investment inputs and improve input validation. Update InvestmentChart to display a message prompting users to enter values for customization. `+44, -17`
- Add release management scripts and changelog documentation `+971`
- Enhance CreditCardCalculator and InvestmentChart with dark mode support and animations `+903, -252`
- Add CI/CD workflows and configuration files for comprehensive project automation `+2422, -21`
- Enhance documentation and user experience for LifeSmart Calculator `+8996, -105`

### 🔧 Changed Maintenance tasks and chores
- Init `+18778`

### 🗑️ Removed Removed features and cleanup
- Remove 'public' directory from .gitignore to allow tracking of generated files. `-1`

**Total Changes:** 11 commits

---

# Release Types

### Major Version (X.0.0)
- Breaking changes that require user action
- Major architectural changes
- Incompatible API changes

### Minor Version (0.X.0)
- New features added in a backward-compatible manner
- New modules or significant content additions
- UI/UX improvements

### Patch Version (0.0.X)
- Bug fixes and minor improvements
- Content updates and corrections
- Performance optimizations
- Documentation updates

---

## How to Read This Changelog

- **✨ Added**: New features, modules, or functionality
- **🔧 Changed**: Changes in existing functionality
- **🗑️ Removed**: Features that have been removed
- **🐛 Fixed**: Bug fixes and corrections
- **🛡️ Security**: Security-related changes and improvements
- **📚 Documentation**: Documentation updates and improvements
- **🧪 Testing**: Test-related changes and improvements
- **🚀 Performance**: Performance improvements and optimizations

---

## Contributing to the Changelog

When contributing to LifeSmart Calculator, please ensure your changes are documented in this changelog:

1. **For new features**: Use conventional commit format: `feat: description`
2. **For bug fixes**: Use conventional commit format: `fix: description`
3. **For breaking changes**: Use conventional commit format: `feat!: description`
4. **For security updates**: Use conventional commit format: `security: description`

The release script will automatically update this file when creating new releases.

---

## Links

- [GitHub Repository](https://github.com/your-username/lifesmart-calculator)
- [Live Demo](https://lifesmart-calculator.com)
- [Documentation](https://docs.lifesmart-calculator.com)
- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

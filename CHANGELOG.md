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

### [v1.1.1] - 2025-10-10

### ✨ Added New features and enhancements
- Add wp plugin `+514`
- Add wp plugin `+514`
- Updated wp plugin running from cf `+8665, -6791`
- Merge branch 'feat/wp-plugin' of https://github.com/lifesmart-financial-literacy/lifesmart-calculator into feat/wp-plugin `+1, -1`
- Add conclusion card to CreditCardCalculator for total savings overview `+111`
- Implement Investment Growth Calculator in CreditCardCalculator `+103, -103`

### 🐛 Fixed Bug fixes and improvements
- Missing github token `+1`
- Merge pull request #5 from lifesmart-financial-literacy/fix/actions `+1`
- Update TypeScript module resolution and remove Cloudflare plugin from Vite config `+2, -7`

### 📚 Documentation Documentation updates
- Update CHANGELOG for v1.1.0 release `+22, -1`

### 🔧 Changed Code refactoring and restructuring
- Update CreditCardCalculator to improve balance calculations and UI `+81, -13`
- Enhance CreditCardCalculator UI and formatting `+22, -9`

### 🔧 Changed Maintenance tasks and chores
- Update dependencies and enhance components with new icons `+57, -41`

**Total Changes:** 13 commits

---

## [v1.1.0] - 2025-10-08

### ✨ Added New features and enhancements
- Release v1.0.0: Major updates including new features, enhancements, and documentation improvements. Introduced CreditCardCalculator and InvestmentChart components, added dark mode support, and integrated CI/CD workflows. Comprehensive project configuration with essential files and improved user experience. Total of 11 commits. `+24, -1`
- Refactor CreditCardCalculator and InvestmentChart for improved UI and performance `+179, -243`
- Refactor InvestmentChart component to streamline data presentation and improve layout `+1, -28`
- Update default investment time period in CreditCardCalculator to 10 years and adjust placeholder accordingly for improved user guidance. `+2, -2`
- Refactor CreditCardCalculator layout for improved user experience `+136, -133`
- Integrate InvestmentChart into CreditCardCalculator for enhanced investment tracking `+9, -8`
- Update text size in CreditCardCalculator for improved readability `+1, -1`
- Enhance InvestmentChart and CreditCardCalculator with dark mode support `+10, -3`
- Enhance CreditCardCalculator button styles and toggle animation for improved user experience `+20, -6`
- Add initial project setup with Vite, ESLint, and TypeScript configuration `+8170, -14625`

### 🎨 Changed Code style and formatting changes
- Refactor PostCSS and Tailwind configuration to use ES module syntax `+2, -2`

**Total Changes:** 11 commits

---

## [v1.0.0] - 2025-10-02

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

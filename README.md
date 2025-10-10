# LifeSmart Calculator

<div align="center">

![LifeSmart Calculator](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.18-38bdf8.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**Professional credit card interest and investment calculator built with modern web technologies**

[Live Demo](https://lifesmart-calculator.com) • [Documentation](docs/) • [Report Bug](https://github.com/your-username/lifesmart-calculator/issues) • [Request Feature](https://github.com/your-username/lifesmart-calculator/issues)

</div>

---

## Features

### Credit Card Interest Calculator
- **Balance Paid Off Tracking**: Calculate based on percentage of monthly spending paid off
- **Real-time Interest Calculation**: Instant calculations showing annual interest costs
- **SPZero Card Comparison**: Side-by-side comparison between standard credit cards and SPZero's 0% APR offering
- **Interactive Controls**: Slider with 5% increments or direct dollar amount input
- **Financial Journey Visualization**: Long-term savings projections over 1, 5, and custom year periods

### Investment Growth Calculator
- **Compound Interest Visualization**: Interactive Chart.js charts showing investment growth over time
- **Flexible Time Periods**: Calculate growth for 1-30 years
- **Custom Return Rates**: Support for various investment return rate scenarios
- **Monthly Contribution Tracking**: Visualize how saved interest could grow when invested

### Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Configurable theme with smooth transitions and purple accent colors
- **Animated Transitions**: Smooth fade-in and pulse animations on value changes
- **Accessibility**: Keyboard navigation and ARIA labels for screen readers
- **Clean Purple Theme**: Cohesive purple color scheme throughout light and dark modes

### Performance & Quality
- **Fast Load Times**: Built with Vite for optimized development and production builds
- **Type Safe**: Full TypeScript implementation for code reliability
- **SEO Optimized**: Meta tags, sitemap, and robots.txt included
- **Input Validation**: Client-side validation with proper error handling

---

## Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/lifesmart-calculator.git

# Navigate to project directory
cd lifesmart-calculator

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:5173](http://localhost:5173) to view the application in development mode.

### Production Build

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview

# Serve build directory
npm run serve
```

---

## Tech Stack

### Frontend
- **React 19.2.0** - Modern React with latest features
- **TypeScript 5.9.3** - Type-safe JavaScript development
- **Vite 7.1.9** - Fast build tool and development server
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Chart.js 4.5.0** - Interactive data visualization
- **React Chart.js 2 5.3.0** - React wrapper for Chart.js
- **React Icons 5.5.0** - Icon library for UI components

### Development Tools
- **Vitest 3.2.4** - Fast unit testing framework
- **Playwright 1.48.2** - End-to-end testing
- **ESLint** - Code linting and quality assurance
- **Prettier 3.3.3** - Code formatting
- **TypeScript ESLint 8.46.0** - TypeScript-specific linting rules

### Deployment
- **Cloudflare Workers** - Edge computing deployment platform
- **Wrangler 4.42.1** - Cloudflare Workers CLI
- **Lighthouse CI** - Performance monitoring

---

## Project Structure

```
lifesmart-calculator/
├── public/                    # Static assets
│   ├── index.html            # Main HTML template (Vite entry)
│   ├── manifest.json         # PWA manifest
│   ├── robots.txt            # SEO robots file
│   ├── sitemap.xml           # SEO sitemap
│   ├── favicon.ico           # Favicon
│   ├── favicon.svg           # SVG favicon
│   ├── privacy-policy.html   # Privacy policy page
│   └── terms-of-service.html # Terms of service page
├── src/                      # Source code
│   ├── components/           # React components
│   │   ├── CreditCardCalculator.tsx
│   │   └── InvestmentChart.tsx
│   ├── types/                # TypeScript definitions
│   │   └── svg.d.ts
│   ├── App.tsx               # Main app component
│   ├── App.css               # App styles
│   ├── index.tsx             # App entry point
│   ├── index.css             # Global styles
│   └── reportWebVitals.ts    # Performance monitoring
├── docs/                     # Documentation
│   ├── api.md
│   ├── architecture.md
│   ├── deployment.md
│   ├── development.md
│   ├── performance.md
│   ├── security.md
│   ├── testing.md
│   ├── troubleshooting.md
│   └── user-guide.md
├── tests/                    # Test files
│   └── e2e/                  # End-to-end tests
│       └── calculator.spec.js
├── scripts/                  # Build and utility scripts
│   └── update_changelog.py
├── worker/                   # Cloudflare Workers
│   └── index.ts
├── build/                    # Production build output
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.js            # Vite configuration
├── vitest.config.ts          # Vitest test configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── playwright.config.js      # Playwright E2E test configuration
├── wrangler.jsonc            # Cloudflare Workers configuration
├── release.sh                # Release automation script
├── CHANGELOG.md              # Version history
├── CONTRIBUTING.md           # Contribution guidelines
├── SECURITY.md               # Security policy
└── README.md                 # This file
```

---

## Calculator Functionality

### Credit Card Parameters
The calculator accepts three main inputs:

1. **Average Monthly Spending** - Total credit card spending per month
2. **Average Balance Paid Off Monthly** - Percentage of balance paid off each month (slider moves in 5% increments)
3. **Annual Percentage Rate (APR)** - Interest rate charged by the credit card

Users can input values either through:
- Direct numeric input fields
- Range slider (for balance paid off percentage)
- Dollar amount input (automatically calculates percentage)

### Calculation Logic

```typescript
// Balance paid off calculation
const paidOffBalance = monthlySpend × (balanceCarriedPercent / 100);

// Balance carried forward
const carriedBalance = monthlySpend - paidOffBalance;

// Annual interest cost
const annualInterest = carriedBalance × (apr / 100);

// Monthly savings with 0% APR
const monthlySavings = annualInterest / 12;
```

### Investment Growth
The saved interest amount is then projected as monthly investment contributions with compound interest over time, showing potential wealth accumulation.

---

## Testing

### Running Tests

```bash
# Run unit tests
npm test

# Run tests with UI
npm run test:ui

# Run tests once (no watch mode)
npm run test:run

# Run end-to-end tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run performance tests
npm run lighthouse
```

---

## Deployment

### Cloudflare Workers (Recommended)

```bash
# Build and deploy to Cloudflare
npm run deploy

# Preview deployment
npm run preview
```

### Static Hosting (Netlify, Vercel, etc.)

```bash
# Build the project
npm run build

# The build/ directory contains static files ready for deployment
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Vite development server |
| `npm run dev` | Start Vite development server (alias) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run Vitest test suite |
| `npm run test:ui` | Run tests with UI |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lighthouse` | Run Lighthouse performance tests |
| `npm run bundle-analyzer` | Analyze bundle size |
| `npm run serve` | Serve production build locally |
| `npm run deploy` | Build and deploy to Cloudflare Workers |
| `npm run deps:check` | Check for dependency updates |
| `npm run deps:update` | Update dependencies |
| `npm run deps:audit` | Run security audit |
| `npm run clean` | Remove build artifacts |

---

## Configuration

### AppConfig Interface

The calculator accepts a configuration object to customize behavior:

```typescript
interface AppConfig {
  mode: 'auto' | 'light' | 'dark';  // Theme mode
  transparentBackground: boolean;     // Background transparency
}
```

- **mode**: Controls the color theme
  - `'auto'`: User can toggle, preference saved to localStorage
  - `'light'`: Forces light mode
  - `'dark'`: Forces dark mode
  
- **transparentBackground**: When `true`, uses transparent background instead of colored background

---

## Development Workflow

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm start

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type check
npm run type-check

# Run tests
npm test

# Build for production
npm run build
```

---

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[API Documentation](docs/api.md)** - Component API reference
- **[Architecture Guide](docs/architecture.md)** - Technical architecture overview
- **[Deployment Guide](docs/deployment.md)** - Deployment instructions
- **[Development Guide](docs/development.md)** - Development setup and guidelines
- **[Performance Guide](docs/performance.md)** - Performance optimization
- **[Security Guide](docs/security.md)** - Security best practices
- **[Testing Guide](docs/testing.md)** - Testing strategies and examples
- **[Troubleshooting](docs/troubleshooting.md)** - Common issues and solutions
- **[User Guide](docs/user-guide.md)** - Complete user manual

---

## WordPress Plugin

The calculator can be embedded as a WordPress plugin. See `lifesmart-calculator.php` and `WP-README.md` for WordPress-specific documentation.

Package the plugin using:
```bash
./package-wp-plugin.sh
```

---

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Run linting: `npm run lint`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

---

## Security

Security is important to us. Please see our [Security Policy](SECURITY.md) for reporting vulnerabilities.

### Security Features
- Input validation on all user inputs
- Client-side only calculations (no data sent to servers)
- No sensitive data stored
- Regular dependency security audits

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- React Team - For the React framework
- Tailwind CSS Team - For the utility-first CSS framework
- Chart.js Team - For the charting library
- Vite Team - For the fast build tool
- Cloudflare - For Workers edge computing platform

---

## Support

- Email: [support@lifesmart-calculator.com](mailto:support@lifesmart-calculator.com)
- Bug Reports: [GitHub Issues](https://github.com/your-username/lifesmart-calculator/issues)
- Feature Requests: [GitHub Discussions](https://github.com/your-username/lifesmart-calculator/discussions)
- Documentation: [docs/](docs/)

---

<div align="center">

**Built by the LifeSmart Calculator Team**

[Star this repo](https://github.com/your-username/lifesmart-calculator) • [Report Bug](https://github.com/your-username/lifesmart-calculator/issues) • [Request Feature](https://github.com/your-username/lifesmart-calculator/issues) • [Documentation](docs/)

</div>

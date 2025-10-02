# 📚 API Documentation

This document provides comprehensive API documentation for the LifeSmart Calculator components and utilities.

## Table of Contents

- [Components](#components)
- [Types](#types)
- [Utilities](#utilities)
- [Hooks](#hooks)
- [Constants](#constants)

---

## Components

### CreditCardCalculator

The main calculator component that handles credit card interest calculations and investment growth visualization.

#### Props

```typescript
interface CreditCardCalculatorProps {
  // No props - this is the main component
}
```

#### State

```typescript
interface CalculatorState {
  monthlySpend: number;
  balanceCarriedPercent: number;
  apr: number;
  timePeriod: number | null;
  returnRate: number | null;
  darkMode: boolean;
  isLoaded: boolean;
}
```

#### Methods

```typescript
// Calculate annual interest
const calculateAnnualInterest = (monthlySpend: number, balanceCarriedPercent: number, apr: number): number

// Calculate monthly savings
const calculateMonthlySavings = (monthlySpend: number, balanceCarriedPercent: number): number

// Handle input changes
const handleInputChange = (field: keyof CalculatorInputs, value: number): void

// Handle investment changes
const handleInvestmentChange = (field: keyof InvestmentInputs, value: number | null): void

// Toggle dark mode
const toggleDarkMode = (): void
```

#### Example Usage

```tsx
import CreditCardCalculator from './components/CreditCardCalculator';

function App() {
  return <CreditCardCalculator />;
}
```

---

### InvestmentChart

A Chart.js-based component for visualizing investment growth over time.

#### Props

```typescript
interface InvestmentChartProps {
  monthlyContribution: number;
  annualRate: number;
  timePeriod: number;
}
```

#### Props Details

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `monthlyContribution` | `number` | ✅ | - | Monthly investment contribution |
| `annualRate` | `number` | ✅ | - | Annual return rate (as decimal) |
| `timePeriod` | `number` | ✅ | - | Investment period in years |

#### Chart Configuration

```typescript
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 2000,
    easing: 'easeInOutQuart' as const,
  },
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 14,
          weight: 'bold' as const,
        },
      },
    },
    title: {
      display: true,
      text: 'Investment Growth Over Time',
      font: {
        size: 18,
        weight: 'bold' as const,
      },
      color: '#1f2937',
    },
    tooltip: {
      enabled: true,
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: '#3b82f6',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Years',
        font: {
          size: 14,
          weight: 'bold' as const,
        },
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Value ($)',
        font: {
          size: 14,
          weight: 'bold' as const,
        },
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        callback: (value: any) => `$${value.toLocaleString()}`,
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
};
```

#### Example Usage

```tsx
import InvestmentChart from './components/InvestmentChart';

function MyComponent() {
  return (
    <InvestmentChart
      monthlyContribution={500}
      annualRate={0.09}
      timePeriod={10}
    />
  );
}
```

---

## Types

### CalculatorInputs

```typescript
interface CalculatorInputs {
  monthlySpend: number;
  balanceCarriedPercent: number;
  apr: number;
}
```

### InvestmentInputs

```typescript
interface InvestmentInputs {
  timePeriod: number | null;
  returnRate: number | null;
}
```

### ChartData

```typescript
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
  }[];
}
```

---

## Utilities

### calculateCompoundInterest

Calculates compound interest for investment growth.

```typescript
function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): { totalValue: number; totalInvested: number; interestEarned: number }
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `principal` | `number` | Initial investment amount |
| `monthlyContribution` | `number` | Monthly contribution amount |
| `annualRate` | `number` | Annual interest rate (as decimal) |
| `years` | `number` | Investment period in years |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `totalValue` | `number` | Final investment value |
| `totalInvested` | `number` | Total amount invested |
| `interestEarned` | `number` | Interest earned over time |

#### Example

```typescript
const result = calculateCompoundInterest(0, 500, 0.09, 10);
console.log(result);
// {
//   totalValue: 95650.23,
//   totalInvested: 60000,
//   interestEarned: 35650.23
// }
```

### formatCurrency

Formats numbers as currency strings.

```typescript
function formatCurrency(amount: number): string
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `amount` | `number` | Amount to format |

#### Returns

| Type | Description |
|------|-------------|
| `string` | Formatted currency string (e.g., "$1,234.56") |

#### Example

```typescript
const formatted = formatCurrency(1234.56);
console.log(formatted); // "$1,234.56"
```

### validateInput

Validates user input for calculator fields.

```typescript
function validateInput(value: string, min: number, max: number): {
  isValid: boolean;
  error?: string;
  numericValue: number;
}
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `string` | Input value to validate |
| `min` | `number` | Minimum allowed value |
| `max` | `number` | Maximum allowed value |

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `isValid` | `boolean` | Whether input is valid |
| `error` | `string?` | Error message if invalid |
| `numericValue` | `number` | Parsed numeric value |

#### Example

```typescript
const validation = validateInput("25.5", 0, 100);
if (validation.isValid) {
  console.log(validation.numericValue); // 25.5
} else {
  console.log(validation.error);
}
```

---

## Hooks

### useLocalStorage

Custom hook for managing localStorage with React state.

```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void]
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | `string` | localStorage key |
| `initialValue` | `T` | Initial value if key doesn't exist |

#### Returns

| Type | Description |
|------|-------------|
| `[T, (value: T \| ((val: T) => T)) => void]` | State value and setter function |

#### Example

```typescript
const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

// Toggle dark mode
setDarkMode(!darkMode);
```

### useDebounce

Custom hook for debouncing values.

```typescript
function useDebounce<T>(value: T, delay: number): T
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `T` | Value to debounce |
| `delay` | `number` | Delay in milliseconds |

#### Returns

| Type | Description |
|------|-------------|
| `T` | Debounced value |

#### Example

```typescript
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);

// Use debouncedSearchTerm for API calls
useEffect(() => {
  if (debouncedSearchTerm) {
    // Perform search
  }
}, [debouncedSearchTerm]);
```

---

## Constants

### Default Values

```typescript
const DEFAULT_VALUES = {
  MONTHLY_SPEND: 2000,
  BALANCE_CARRIED_PERCENT: 20,
  APR: 23,
  TIME_PERIOD: 10,
  RETURN_RATE: 9,
} as const;
```

### Validation Limits

```typescript
const VALIDATION_LIMITS = {
  MONTHLY_SPEND: { min: 0, max: 100000 },
  BALANCE_CARRIED_PERCENT: { min: 0, max: 100 },
  APR: { min: 0, max: 100 },
  TIME_PERIOD: { min: 1, max: 50 },
  RETURN_RATE: { min: 0, max: 50 },
} as const;
```

### Chart Colors

```typescript
const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#10b981',
  BACKGROUND: 'rgba(59, 130, 246, 0.1)',
  BORDER: '#3b82f6',
} as const;
```

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `InvalidInputError` | Invalid user input | Validate input before processing |
| `CalculationError` | Math operation failure | Check for division by zero, NaN, etc. |
| `ChartError` | Chart.js rendering issue | Verify data format and options |

### Error Boundaries

```tsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="error-boundary">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CreditCardCalculator />
    </ErrorBoundary>
  );
}
```

---

## Performance Considerations

### Optimization Tips

1. **Memoization** - Use `React.memo` for expensive components
2. **Callback Optimization** - Use `useCallback` for event handlers
3. **Chart Updates** - Debounce chart updates to prevent excessive re-renders
4. **Bundle Size** - Import only needed Chart.js components

### Memory Management

- Clean up event listeners in `useEffect` cleanup
- Avoid memory leaks in chart instances
- Use `useRef` for DOM references that don't need re-renders

---

## Testing

### Unit Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import CreditCardCalculator from './CreditCardCalculator';

test('calculates interest correctly', () => {
  render(<CreditCardCalculator />);
  
  const monthlySpendInput = screen.getByPlaceholder('2000');
  fireEvent.change(monthlySpendInput, { target: { value: '3000' } });
  
  // Assert expected calculations
  expect(screen.getByText('Annual Interest:')).toBeInTheDocument();
});
```

### Integration Tests

```typescript
import { render, screen } from '@testing-library/react';
import InvestmentChart from './InvestmentChart';

test('renders chart with correct data', () => {
  render(
    <InvestmentChart
      monthlyContribution={500}
      annualRate={0.09}
      timePeriod={10}
    />
  );
  
  expect(screen.getByText('Investment Growth Over Time')).toBeInTheDocument();
});
```

---

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| IE | 11 | ❌ Not supported |

---

## Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation** - All interactive elements are keyboard accessible
- **Screen Reader Support** - Proper ARIA labels and roles
- **Color Contrast** - Meets minimum contrast ratios
- **Focus Management** - Clear focus indicators

### ARIA Labels

```tsx
<input
  type="range"
  aria-label="Balance carried percentage"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={balanceCarriedPercent}
/>
```

---

## Migration Guide

### From v1.0 to v2.0

1. **Props Changes** - Some component props have been renamed
2. **Type Updates** - TypeScript interfaces have been updated
3. **Styling** - Tailwind classes may need updates

### Breaking Changes

- `monthlySpend` prop renamed to `monthlyContribution`
- `apr` prop renamed to `annualRate`
- Chart configuration object structure updated

---

## Support

For API-related questions or issues:

- 📧 **Email**: api@lifesmart-calculator.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/lifesmart-calculator/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/lifesmart-calculator/discussions)
- 📚 **Documentation**: [Full Documentation](https://docs.lifesmart-calculator.com)

# ⚡ Performance Guide

This comprehensive performance guide covers optimization strategies, monitoring, and best practices for the LifeSmart Calculator.

## Table of Contents

- [Performance Overview](#performance-overview)
- [Core Web Vitals](#core-web-vitals)
- [Bundle Optimization](#bundle-optimization)
- [Runtime Performance](#runtime-performance)
- [Memory Management](#memory-management)
- [Network Optimization](#network-optimization)
- [Caching Strategies](#caching-strategies)
- [Performance Monitoring](#performance-monitoring)
- [Performance Testing](#performance-testing)
- [Optimization Techniques](#optimization-techniques)
- [Performance Budgets](#performance-budgets)
- [Troubleshooting](#troubleshooting)

---

## Performance Overview

### Performance Metrics

The LifeSmart Calculator targets the following performance metrics:

- **Lighthouse Score**: ≥ 90
- **First Contentful Paint (FCP)**: ≤ 1.5s
- **Largest Contentful Paint (LCP)**: ≤ 2.5s
- **Cumulative Layout Shift (CLS)**: ≤ 0.1
- **First Input Delay (FID)**: ≤ 100ms
- **Time to Interactive (TTI)**: ≤ 3.5s
- **Bundle Size**: ≤ 500KB (gzipped)
- **JavaScript Bundle**: ≤ 300KB (gzipped)
- **CSS Bundle**: ≤ 50KB (gzipped)

### Performance Budget

```json
{
  "budget": [
    {
      "path": "/*",
      "timings": [
        {
          "metric": "first-contentful-paint",
          "budget": 1500
        },
        {
          "metric": "largest-contentful-paint",
          "budget": 2500
        },
        {
          "metric": "cumulative-layout-shift",
          "budget": 0.1
        }
      ],
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 300
        },
        {
          "resourceType": "stylesheet",
          "budget": 50
        },
        {
          "resourceType": "image",
          "budget": 100
        }
      ]
    }
  ]
}
```

---

## Core Web Vitals

### First Contentful Paint (FCP)

**Target**: ≤ 1.5s

#### Optimization Strategies

1. **Critical CSS Inlining**
```css
/* Inline critical CSS in HTML head */
<style>
  /* Critical above-the-fold styles */
  .calculator-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .calculator-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
  }
</style>
```

2. **Resource Hints**
```html
<!-- Preload critical resources -->
<link rel="preload" href="/static/css/critical.css" as="style">
<link rel="preload" href="/static/js/main.js" as="script">

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdn.jsdelivr.net">
```

3. **Font Optimization**
```css
/* Use font-display: swap for better FCP */
@font-face {
  font-family: 'Inter';
  src: url('inter.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}
```

### Largest Contentful Paint (LCP)

**Target**: ≤ 2.5s

#### Optimization Strategies

1. **Image Optimization**
```typescript
// Lazy load images below the fold
const LazyImage: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} {...props}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}
    </div>
  );
};
```

2. **Critical Resource Prioritization**
```html
<!-- High priority for LCP elements -->
<link rel="preload" href="/static/css/above-fold.css" as="style" high>
<link rel="preload" href="/static/js/calculator.js" as="script" high>
```

3. **Server-Side Rendering (SSR)**
```typescript
// Pre-render critical content
const CalculatorSSR: React.FC = () => {
  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h1>LifeSmart Calculator</h1>
        <p>Professional financial planning tool</p>
      </div>
      {/* Critical content rendered server-side */}
    </div>
  );
};
```

### Cumulative Layout Shift (CLS)

**Target**: ≤ 0.1

#### Optimization Strategies

1. **Reserve Space for Dynamic Content**
```css
/* Reserve space for charts and dynamic content */
.chart-container {
  min-height: 400px;
  width: 100%;
}

.loading-placeholder {
  height: 400px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

2. **Font Loading Optimization**
```css
/* Prevent layout shift during font loading */
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-display: swap;
}

/* Reserve space for custom fonts */
h1, h2, h3 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.2;
}
```

3. **Image Aspect Ratio**
```css
/* Maintain aspect ratio for images */
.image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### First Input Delay (FID)

**Target**: ≤ 100ms

#### Optimization Strategies

1. **Code Splitting**
```typescript
// Lazy load non-critical components
const InvestmentChart = lazy(() => import('./InvestmentChart'));
const AdvancedSettings = lazy(() => import('./AdvancedSettings'));

// Use Suspense for loading states
const App: React.FC = () => {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <InvestmentChart />
    </Suspense>
  );
};
```

2. **Web Workers for Heavy Calculations**
```typescript
// calculator.worker.ts
self.onmessage = function(e) {
  const { type, data } = e.data;
  
  switch (type) {
    case 'CALCULATE_INVESTMENT':
      const result = calculateInvestmentGrowth(data);
      self.postMessage({ type: 'CALCULATION_COMPLETE', result });
      break;
  }
};

// Main thread usage
const worker = new Worker('/calculator.worker.js');

const calculateWithWorker = (data: CalculationData) => {
  return new Promise((resolve) => {
    worker.postMessage({ type: 'CALCULATE_INVESTMENT', data });
    worker.onmessage = (e) => {
      if (e.data.type === 'CALCULATION_COMPLETE') {
        resolve(e.data.result);
      }
    };
  });
};
```

3. **Debounced Input Handling**
```typescript
// Debounce expensive calculations
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage in component
const Calculator: React.FC = () => {
  const [monthlySpend, setMonthlySpend] = useState(2000);
  const debouncedMonthlySpend = useDebounce(monthlySpend, 300);

  useEffect(() => {
    // Expensive calculation only runs after debounce
    const result = calculateResults(debouncedMonthlySpend);
    setResults(result);
  }, [debouncedMonthlySpend]);
};
```

---

## Bundle Optimization

### Code Splitting

#### Route-Based Splitting
```typescript
// App.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Calculator = lazy(() => import('./pages/Calculator'));
const About = lazy(() => import('./pages/About'));
const Settings = lazy(() => import('./pages/Settings'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
```

#### Component-Based Splitting
```typescript
// Lazy load heavy components
const Chart = lazy(() => import('./Chart'));
const AdvancedCalculator = lazy(() => import('./AdvancedCalculator'));

const Calculator: React.FC = () => {
  const [showChart, setShowChart] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Show Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <Chart />
        </Suspense>
      )}
      
      {showAdvanced && (
        <Suspense fallback={<AdvancedSkeleton />}>
          <AdvancedCalculator />
        </Suspense>
      )}
    </div>
  );
};
```

### Tree Shaking

#### Import Optimization
```typescript
// ❌ Bad - imports entire library
import _ from 'lodash';

// ✅ Good - imports only needed functions
import { debounce, throttle } from 'lodash';

// ❌ Bad - imports entire Chart.js
import Chart from 'chart.js';

// ✅ Good - imports only needed components
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
```

#### Package.json Optimization
```json
{
  "sideEffects": false,
  "module": "src/index.ts",
  "main": "dist/index.js",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js"
    }
  }
}
```

### Bundle Analysis

#### Webpack Bundle Analyzer
```typescript
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html'
    })
  ]
};
```

#### Bundle Size Monitoring
```json
// .bundlesizerc.json
{
  "files": [
    {
      "path": "./build/static/js/*.js",
      "maxSize": "300 kB",
      "compression": "gzip"
    },
    {
      "path": "./build/static/css/*.css",
      "maxSize": "50 kB",
      "compression": "gzip"
    }
  ]
}
```

---

## Runtime Performance

### React Performance

#### Memoization
```typescript
// Memoize expensive components
const ExpensiveComponent = React.memo<Props>(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      calculated: expensiveCalculation(item)
    }));
  }, [data]);

  return (
    <div>
      {processedData.map(item => (
        <ItemComponent key={item.id} item={item} onUpdate={onUpdate} />
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.data.length === nextProps.data.length;
});

// Memoize expensive calculations
const Calculator: React.FC = () => {
  const [inputs, setInputs] = useState(initialInputs);
  
  const results = useMemo(() => {
    return calculateResults(inputs);
  }, [inputs]);
  
  const handleInputChange = useCallback((field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  }, []);
  
  return (
    <div>
      <InputSection inputs={inputs} onChange={handleInputChange} />
      <ResultsSection results={results} />
    </div>
  );
};
```

#### Virtual Scrolling
```typescript
// Virtual scrolling for large lists
const VirtualList: React.FC<VirtualListProps> = ({
  items,
  itemHeight,
  containerHeight
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight),
      items.length
    );
    
    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      index: startIndex + index
    }));
  }, [items, itemHeight, containerHeight, scrollTop]);
  
  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight }}>
        {visibleItems.map(item => (
          <div
            key={item.id}
            style={{
              height: itemHeight,
              transform: `translateY(${item.index * itemHeight}px)`
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Chart Performance

#### Chart.js Optimization
```typescript
// Optimize Chart.js performance
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 0 // Disable animations for better performance
  },
  plugins: {
    legend: {
      display: false // Hide legend for better performance
    }
  },
  scales: {
    x: {
      display: false // Hide x-axis for better performance
    },
    y: {
      display: false // Hide y-axis for better performance
    }
  }
};

// Use canvas instead of SVG for better performance
const Chart: React.FC<ChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      const chart = new Chart(canvasRef.current, {
        type: 'line',
        data,
        options: chartOptions
      });
      
      return () => chart.destroy();
    }
  }, [data]);
  
  return <canvas ref={canvasRef} />;
};
```

---

## Memory Management

### Memory Leak Prevention

#### Cleanup Effects
```typescript
// Cleanup subscriptions and timers
const Calculator: React.FC = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Update data
    }, 1000);
    
    const subscription = dataService.subscribe(setData);
    
    return () => {
      clearInterval(interval);
      subscription.unsubscribe();
    };
  }, []);
  
  return <div>{/* Component content */}</div>;
};
```

#### Event Listener Cleanup
```typescript
// Cleanup event listeners
const useEventListener = (event: string, handler: EventListener) => {
  useEffect(() => {
    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, [event, handler]);
};

// Usage
const Calculator: React.FC = () => {
  const handleResize = useCallback(() => {
    // Handle resize
  }, []);
  
  useEventListener('resize', handleResize);
  
  return <div>{/* Component content */}</div>;
};
```

### Memory Optimization

#### Object Pooling
```typescript
// Object pool for frequently created objects
class ObjectPool<T> {
  private pool: T[] = [];
  private createFn: () => T;
  
  constructor(createFn: () => T) {
    this.createFn = createFn;
  }
  
  get(): T {
    return this.pool.pop() || this.createFn();
  }
  
  release(obj: T): void {
    this.pool.push(obj);
  }
}

// Usage
const chartDataPool = new ObjectPool(() => ({
  labels: [],
  datasets: []
}));
```

#### Weak References
```typescript
// Use WeakMap for caching without memory leaks
const calculationCache = new WeakMap<CalculationData, CalculationResult>();

const calculateWithCache = (data: CalculationData): CalculationResult => {
  if (calculationCache.has(data)) {
    return calculationCache.get(data)!;
  }
  
  const result = expensiveCalculation(data);
  calculationCache.set(data, result);
  return result;
};
```

---

## Network Optimization

### Resource Optimization

#### Image Optimization
```typescript
// Responsive images with WebP support
const ResponsiveImage: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  return (
    <picture>
      <source
        srcSet={`${src}.webp`}
        type="image/webp"
      />
      <source
        srcSet={`${src}.avif`}
        type="image/avif"
      />
      <img
        src={`${src}.jpg`}
        alt={alt}
        loading="lazy"
        {...props}
      />
    </picture>
  );
};
```

#### Font Optimization
```css
/* Preload critical fonts */
@font-face {
  font-family: 'Inter';
  src: url('inter.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
  font-style: normal;
}

/* Use system fonts as fallback */
body {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### CDN Configuration

#### Static Asset Optimization
```typescript
// CDN configuration for static assets
const cdnConfig = {
  baseUrl: 'https://cdn.example.com',
  cacheControl: 'public, max-age=31536000, immutable',
  compression: 'gzip',
  formats: ['webp', 'avif', 'jpg', 'png']
};
```

#### Service Worker Caching
```typescript
// service-worker.js
const CACHE_NAME = 'lifesmart-calculator-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/static/js/vendor.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
```

---

## Caching Strategies

### Browser Caching

#### HTTP Caching Headers
```typescript
// Cache configuration
const cacheConfig = {
  static: {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'ETag': 'strong'
  },
  dynamic: {
    'Cache-Control': 'public, max-age=3600, must-revalidate',
    'ETag': 'weak'
  },
  api: {
    'Cache-Control': 'private, max-age=300, must-revalidate',
    'ETag': 'weak'
  }
};
```

#### Local Storage Caching
```typescript
// Local storage cache with expiration
class LocalStorageCache {
  private prefix = 'lifesmart_';
  
  set(key: string, value: any, ttl: number = 3600000): void {
    const item = {
      value,
      expiry: Date.now() + ttl
    };
    localStorage.setItem(this.prefix + key, JSON.stringify(item));
  }
  
  get(key: string): any {
    const item = localStorage.getItem(this.prefix + key);
    if (!item) return null;
    
    const parsed = JSON.parse(item);
    if (Date.now() > parsed.expiry) {
      localStorage.removeItem(this.prefix + key);
      return null;
    }
    
    return parsed.value;
  }
}
```

### Application Caching

#### React Query for Data Caching
```typescript
// React Query configuration
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
});

// Usage
const useCalculationResults = (inputs: CalculationInputs) => {
  return useQuery(
    ['calculation', inputs],
    () => calculateResults(inputs),
    {
      enabled: !!inputs.monthlySpend,
      staleTime: 5 * 60 * 1000
    }
  );
};
```

---

## Performance Monitoring

### Real User Monitoring (RUM)

#### Web Vitals Monitoring
```typescript
// web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric: any) => {
  // Send to analytics service
  if (process.env.NODE_ENV === 'production') {
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id
    });
  }
};

// Monitor all Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

#### Performance Observer
```typescript
// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'measure') {
      console.log(`${entry.name}: ${entry.duration}ms`);
      
      // Send to analytics
      sendToAnalytics({
        name: entry.name,
        duration: entry.duration,
        timestamp: entry.startTime
      });
    }
  }
});

performanceObserver.observe({ entryTypes: ['measure'] });

// Measure custom performance
performance.mark('calculation-start');
// ... expensive calculation
performance.mark('calculation-end');
performance.measure('calculation-duration', 'calculation-start', 'calculation-end');
```

### Error Monitoring

#### Error Boundary with Performance
```typescript
// Error boundary with performance tracking
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Track error with performance context
    const performanceData = {
      memory: (performance as any).memory,
      timing: performance.timing,
      navigation: performance.getEntriesByType('navigation')[0]
    };
    
    // Send to error tracking service
    errorTrackingService.captureException(error, {
      ...errorInfo,
      performance: performanceData
    });
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    
    return this.props.children;
  }
}
```

---

## Performance Testing

### Lighthouse CI

#### Configuration
```javascript
// .lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["http://localhost:3000"],
      "settings": {
        "chromeFlags": "--no-sandbox --disable-dev-shm-usage"
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

#### Custom Audits
```javascript
// custom-audits.js
const customAudits = {
  'bundle-size': {
    title: 'Bundle Size',
    description: 'Check if bundle size is within limits',
    audit: (artifacts) => {
      const bundleSize = artifacts.bundleSize;
      const threshold = 500 * 1024; // 500KB
      
      return {
        score: bundleSize <= threshold ? 1 : 0,
        details: {
          bundleSize,
          threshold
        }
      };
    }
  }
};
```

### Load Testing

#### K6 Load Test
```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1']
  }
};

export default function() {
  let response = http.get('http://localhost:3000');
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'content type is text/html': (r) => r.headers['Content-Type'].includes('text/html')
  });
  
  sleep(1);
}
```

---

## Optimization Techniques

### Code Splitting Strategies

#### Dynamic Imports
```typescript
// Dynamic imports for code splitting
const loadChart = async () => {
  const { Chart } = await import('chart.js');
  return Chart;
};

const loadAdvancedFeatures = async () => {
  const { AdvancedCalculator } = await import('./AdvancedCalculator');
  return AdvancedCalculator;
};

// Usage
const Calculator: React.FC = () => {
  const [Chart, setChart] = useState(null);
  const [AdvancedCalculator, setAdvancedCalculator] = useState(null);
  
  useEffect(() => {
    if (showChart) {
      loadChart().then(setChart);
    }
  }, [showChart]);
  
  useEffect(() => {
    if (showAdvanced) {
      loadAdvancedFeatures().then(setAdvancedCalculator);
    }
  }, [showAdvanced]);
  
  return (
    <div>
      {Chart && <Chart data={chartData} />}
      {AdvancedCalculator && <AdvancedCalculator />}
    </div>
  );
};
```

#### Route-Based Splitting
```typescript
// Route-based code splitting
const routes = [
  {
    path: '/',
    component: lazy(() => import('./pages/Calculator'))
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/About'))
  },
  {
    path: '/settings',
    component: lazy(() => import('./pages/Settings'))
  }
];
```

### Bundle Optimization

#### Tree Shaking
```typescript
// Optimize imports for tree shaking
import { debounce } from 'lodash/debounce';
import { throttle } from 'lodash/throttle';

// Instead of
import _ from 'lodash';
```

#### Dead Code Elimination
```typescript
// Use conditional imports
const loadFeature = async (featureName: string) => {
  switch (featureName) {
    case 'chart':
      return import('./features/chart');
    case 'advanced':
      return import('./features/advanced');
    default:
      return null;
  }
};
```

---

## Performance Budgets

### Budget Configuration

#### Webpack Bundle Analyzer
```javascript
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-report.html'
    })
  ]
};
```

#### Performance Budget
```json
{
  "budget": [
    {
      "path": "/*",
      "timings": [
        {
          "metric": "first-contentful-paint",
          "budget": 1500
        },
        {
          "metric": "largest-contentful-paint",
          "budget": 2500
        }
      ],
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 300
        },
        {
          "resourceType": "stylesheet",
          "budget": 50
        }
      ]
    }
  ]
}
```

---

## Troubleshooting

### Common Performance Issues

#### 1. Large Bundle Size

**Problem**: Bundle size exceeds budget
**Solutions**:
- Use code splitting
- Remove unused dependencies
- Optimize imports
- Use tree shaking

#### 2. Slow Initial Load

**Problem**: First Contentful Paint is too slow
**Solutions**:
- Inline critical CSS
- Preload critical resources
- Use resource hints
- Optimize images

#### 3. Layout Shifts

**Problem**: Cumulative Layout Shift is too high
**Solutions**:
- Reserve space for dynamic content
- Use aspect ratio for images
- Optimize font loading
- Avoid dynamic content insertion

#### 4. Memory Leaks

**Problem**: Memory usage increases over time
**Solutions**:
- Cleanup event listeners
- Clear intervals and timeouts
- Use WeakMap for caching
- Implement proper cleanup

### Performance Debugging

#### Chrome DevTools
```typescript
// Performance debugging
const debugPerformance = () => {
  // Measure component render time
  const start = performance.now();
  
  // Component render logic
  
  const end = performance.now();
  console.log(`Component render time: ${end - start}ms`);
};

// Memory usage monitoring
const monitorMemory = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log('Memory usage:', {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit
    });
  }
};
```

#### React DevTools Profiler
```typescript
// Profiler component
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration) => {
  console.log('Profiler:', { id, phase, actualDuration });
};

const App: React.FC = () => {
  return (
    <Profiler id="Calculator" onRender={onRenderCallback}>
      <Calculator />
    </Profiler>
  );
};
```

---

## Conclusion

This performance guide provides comprehensive strategies for optimizing the LifeSmart Calculator. Key takeaways:

1. **Monitor Core Web Vitals** - Track FCP, LCP, CLS, FID, and TTI
2. **Optimize Bundle Size** - Use code splitting, tree shaking, and dead code elimination
3. **Implement Caching** - Use browser caching, service workers, and application caching
4. **Monitor Performance** - Use RUM, performance observers, and error tracking
5. **Test Performance** - Use Lighthouse CI, load testing, and performance budgets

Remember to:
- Set performance budgets and monitor them
- Use performance testing in CI/CD
- Monitor real user metrics
- Optimize for mobile devices
- Keep performance as a priority in development

Happy optimizing! ⚡

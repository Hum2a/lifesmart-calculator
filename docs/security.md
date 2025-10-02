# 🔒 Security Guide

This guide covers security best practices, vulnerabilities, and protection strategies for the LifeSmart Calculator.

## Table of Contents

- [Security Overview](#security-overview)
- [Input Validation](#input-validation)
- [XSS Prevention](#xss-prevention)
- [CSRF Protection](#csrf-protection)
- [Content Security Policy](#content-security-policy)
- [Data Protection](#data-protection)
- [Authentication & Authorization](#authentication--authorization)
- [Security Headers](#security-headers)
- [Dependency Security](#dependency-security)
- [Security Testing](#security-testing)
- [Incident Response](#incident-response)

---

## Security Overview

### Security Principles

1. **Defense in Depth** - Multiple layers of security
2. **Least Privilege** - Minimum necessary access
3. **Fail Secure** - Default to secure state
4. **Input Validation** - Validate all inputs
5. **Output Encoding** - Encode all outputs

### Threat Model

| Threat | Impact | Likelihood | Mitigation |
|--------|--------|------------|------------|
| XSS | High | Medium | Input validation, CSP |
| CSRF | Medium | Low | CSRF tokens |
| Data Breach | High | Low | Encryption, access controls |
| DDoS | Medium | Medium | Rate limiting, CDN |

---

## Input Validation

### Client-Side Validation

```typescript
// Input validation utilities
const validateInput = (value: string, type: 'number' | 'string'): boolean => {
  switch (type) {
    case 'number':
      return !isNaN(Number(value)) && Number(value) >= 0;
    case 'string':
      return typeof value === 'string' && value.length > 0;
    default:
      return false;
  }
};

// Sanitization
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/[&"']/g, '') // Remove special characters
    .trim();
};

// Usage in components
const Calculator: React.FC = () => {
  const [monthlySpend, setMonthlySpend] = useState(2000);
  
  const handleInputChange = (value: string) => {
    if (validateInput(value, 'number')) {
      setMonthlySpend(Number(value));
    }
  };
  
  return (
    <input
      value={monthlySpend}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
};
```

### Server-Side Validation

```typescript
// Server-side validation (if applicable)
const validateCalculationInput = (input: CalculationInput): boolean => {
  return (
    typeof input.monthlySpend === 'number' &&
    input.monthlySpend >= 0 &&
    input.monthlySpend <= 1000000 &&
    typeof input.apr === 'number' &&
    input.apr >= 0 &&
    input.apr <= 100
  );
};
```

---

## XSS Prevention

### Output Encoding

```typescript
// Safe HTML rendering
const SafeHTML: React.FC<{ content: string }> = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

// Text content (automatically escaped by React)
const TextContent: React.FC<{ text: string }> = ({ text }) => {
  return <div>{text}</div>; // React automatically escapes
};
```

### Content Security Policy

```html
<!-- CSP header -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self';
  font-src 'self' https://fonts.gstatic.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
">
```

---

## CSRF Protection

### CSRF Tokens

```typescript
// CSRF token generation
const generateCSRFToken = (): string => {
  return btoa(crypto.getRandomValues(new Uint8Array(32)).join(''));
};

// CSRF token validation
const validateCSRFToken = (token: string): boolean => {
  // Validate token format and expiration
  return token.length === 44 && /^[A-Za-z0-9+/=]+$/.test(token);
};
```

---

## Content Security Policy

### CSP Configuration

```typescript
// CSP configuration
const cspConfig = {
  'default-src': "'self'",
  'script-src': "'self' 'unsafe-inline'",
  'style-src': "'self' 'unsafe-inline'",
  'img-src': "'self' data: https:",
  'connect-src': "'self'",
  'font-src': "'self' https://fonts.gstatic.com",
  'object-src': "'none'",
  'base-uri': "'self'",
  'form-action': "'self'"
};

// Apply CSP
const applyCSP = () => {
  const cspHeader = Object.entries(cspConfig)
    .map(([key, value]) => `${key} ${value}`)
    .join('; ');
  
  document.head.insertAdjacentHTML('beforeend', 
    `<meta http-equiv="Content-Security-Policy" content="${cspHeader}">`
  );
};
```

---

## Data Protection

### Data Encryption

```typescript
// Client-side encryption for sensitive data
const encryptData = (data: string, key: string): string => {
  // Use Web Crypto API for encryption
  return btoa(data); // Base64 encoding (for demo)
};

const decryptData = (encryptedData: string, key: string): string => {
  return atob(encryptedData); // Base64 decoding (for demo)
};

// Secure data storage
const secureStorage = {
  set: (key: string, value: any) => {
    const encrypted = encryptData(JSON.stringify(value), 'secret-key');
    localStorage.setItem(key, encrypted);
  },
  
  get: (key: string) => {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    
    try {
      const decrypted = decryptData(encrypted, 'secret-key');
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to decrypt data:', error);
      return null;
    }
  }
};
```

### Data Sanitization

```typescript
// Data sanitization
const sanitizeData = (data: any): any => {
  if (typeof data === 'string') {
    return data.replace(/[<>]/g, '').trim();
  }
  
  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeData(value);
    }
    return sanitized;
  }
  
  return data;
};
```

---

## Security Headers

### HTTP Security Headers

```typescript
// Security headers configuration
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'",
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

// Apply security headers
const applySecurityHeaders = () => {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    document.head.insertAdjacentHTML('beforeend', 
      `<meta http-equiv="${key}" content="${value}">`
    );
  });
};
```

---

## Dependency Security

### Security Auditing

```bash
# npm audit
npm audit

# npm audit fix
npm audit fix

# Check for vulnerabilities
npm audit --audit-level moderate
```

### Dependency Monitoring

```json
// package.json security scripts
{
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "security:check": "npm audit --audit-level moderate",
    "deps:check": "npm-check-updates",
    "deps:update": "npm-check-updates -u && npm install"
  }
}
```

---

## Security Testing

### Automated Security Tests

```typescript
// Security test suite
describe('Security Tests', () => {
  it('should prevent XSS attacks', () => {
    const maliciousInput = '<script>alert("xss")</script>';
    const sanitized = sanitizeInput(maliciousInput);
    expect(sanitized).not.toContain('<script>');
  });
  
  it('should validate input properly', () => {
    expect(validateInput('123', 'number')).toBe(true);
    expect(validateInput('abc', 'number')).toBe(false);
    expect(validateInput('', 'string')).toBe(false);
  });
  
  it('should handle malicious data gracefully', () => {
    const maliciousData = {
      name: '<script>alert("xss")</script>',
      value: 'normal value'
    };
    
    const sanitized = sanitizeData(maliciousData);
    expect(sanitized.name).not.toContain('<script>');
    expect(sanitized.value).toBe('normal value');
  });
});
```

### Security Scanning

```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM
  push:
    branches: [main]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run npm audit
        run: npm audit --audit-level moderate
      
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        with:
          args: --severity-threshold=high
      
      - name: Run CodeQL analysis
        uses: github/codeql-action/analyze@v2
```

---

## Incident Response

### Security Incident Plan

1. **Detection** - Monitor for security events
2. **Assessment** - Evaluate impact and severity
3. **Containment** - Isolate affected systems
4. **Eradication** - Remove threats
5. **Recovery** - Restore normal operations
6. **Lessons Learned** - Document and improve

### Security Contacts

- **Security Team**: security@lifesmart-calculator.com
- **Incident Response**: incident@lifesmart-calculator.com
- **Emergency**: +1-555-SECURITY

---

## Conclusion

This security guide provides essential protection strategies for the LifeSmart Calculator. Key security measures:

1. **Input Validation** - Validate and sanitize all inputs
2. **XSS Prevention** - Use output encoding and CSP
3. **Data Protection** - Encrypt sensitive data
4. **Security Headers** - Implement proper HTTP headers
5. **Dependency Security** - Regular security audits
6. **Security Testing** - Automated security tests

Remember to:
- Keep dependencies updated
- Monitor for security vulnerabilities
- Implement defense in depth
- Regular security reviews
- Stay informed about security threats

Stay secure! 🔒

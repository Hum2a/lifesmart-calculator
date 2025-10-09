# LifeSmart Calculator - WordPress Plugin

A professional financial calculator plugin for WordPress that helps users compare credit card interest costs with potential investment returns.

## Installation

1. Upload the plugin folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Use the shortcode `[lifesmart_calculator]` in any post or page

## Requirements

- WordPress 5.0 or higher
- PHP 7.4 or higher
- Modern browser with ES Module support

## Basic Usage

Add the shortcode to any post or page:

```
[lifesmart_calculator]
```

## Shortcode Attributes

### mode
Controls the color scheme of the calculator.

- **auto** (default) - Shows dark/light toggle, respects user preference and saves to localStorage
- **light** - Forces light mode, hides toggle button
- **dark** - Forces dark mode, hides toggle button

Example:
```
[lifesmart_calculator mode="light"]
[lifesmart_calculator mode="dark"]
```

### transparent-background
Controls the background color of the calculator container.

- **false** (default) - Uses standard gray background
- **true** - Transparent background, inherits from page

Example:
```
[lifesmart_calculator transparent-background="true"]
```

### width
Sets the container width. Default: `100%`

Example:
```
[lifesmart_calculator width="800px"]
```

### height
Sets the container height. Default: `auto`

Example:
```
[lifesmart_calculator height="600px"]
```

### class
Adds custom CSS classes to the container.

Example:
```
[lifesmart_calculator class="my-custom-class"]
```

### id
Sets a custom ID for the container. Auto-generated if not provided.

Example:
```
[lifesmart_calculator id="calculator-instance-1"]
```

## Complete Examples

### Default Calculator
```
[lifesmart_calculator]
```

### Light Mode with Custom Width
```
[lifesmart_calculator mode="light" width="900px"]
```

### Dark Mode with Transparent Background
```
[lifesmart_calculator mode="dark" transparent-background="true"]
```

### Fully Customized
```
[lifesmart_calculator 
  mode="auto" 
  transparent-background="false" 
  width="100%" 
  class="my-calculator centered" 
  id="main-calculator"]
```

## Environment Detection

The plugin automatically detects the environment:

- **Local Development** (`.local` domains) - Loads assets from `/build/assets/`
- **Production** - Loads assets from CDN (`https://spzero-widget.lifesmart.workers.dev`)

## Asset Loading

All JavaScript files are loaded as ES modules with version-based cache busting:
- `vendor.js?ver=1.0.0` - React and ReactDOM
- `charts.js?ver=1.0.0` - Chart.js libraries
- `index.js?ver=1.0.0` - Main application
- `index.css?ver=1.0.0` - Styles

## Browser Compatibility

Requires browsers that support ES modules:
- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 16+

## Version

Current version: 1.0.0

## Support

For issues or feature requests, visit the plugin documentation or contact support.


<?php
/**
 * Plugin Name: LifeSmart Calculator
 * Plugin URI: https://www.smartsessions.co.uk/
 * Description: Interest calculator for SPZero.
 * Version: 1.0.3
 * Author: LifeSmart
 * License: MIT
 * Text Domain: lifesmart-calculator
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 * Network: false
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('LIFESMART_CALCULATOR_VERSION', '1.0.3');
define('LIFESMART_CALCULATOR_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('LIFESMART_CALCULATOR_PLUGIN_URL', plugin_dir_url(__FILE__));
define('LIFESMART_CALCULATOR_PLUGIN_FILE', __FILE__);

// CDN Configuration
define('LIFESMART_CALCULATOR_CDN_BASE', 'https://spzero-widget.lifesmart.workers.dev');
define('LIFESMART_CALCULATOR_CDN_CSS', LIFESMART_CALCULATOR_CDN_BASE . '/assets/index.css');
define('LIFESMART_CALCULATOR_CDN_JS_VENDOR', LIFESMART_CALCULATOR_CDN_BASE . '/assets/vendor.js');
define('LIFESMART_CALCULATOR_CDN_JS_CHARTS', LIFESMART_CALCULATOR_CDN_BASE . '/assets/charts.js');
define('LIFESMART_CALCULATOR_CDN_JS_MAIN', LIFESMART_CALCULATOR_CDN_BASE . '/assets/index.js');

/**
 * Main LifeSmart Calculator Plugin Class
 */
class LifeSmartCalculator {
    
    /**
     * Single instance of the plugin
     */
    private static $instance = null;
    
    /**
     * Asset configuration
     */
    private $asset_config = array();
    
    /**
     * Get single instance of the plugin
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        $this->init_asset_config();
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('lifesmart_calculator', array($this, 'render_shortcode'));
        add_action('wp_head', array($this, 'add_preload_hints'), 1);
        // Register script filter globally for ACF and dynamic content compatibility
        add_filter('script_loader_tag', array($this, 'add_type_module_attribute'), 10, 3);
    }
    
    /**
     * Initialize asset configuration based on environment
     */
    private function init_asset_config() {
        $hostname = $this->get_current_hostname();
        $is_local = $this->is_local_environment($hostname);
        
        if ($is_local) {
            // Use local assets for development with consistent file names
            $this->asset_config = array(
                'css_url' => LIFESMART_CALCULATOR_PLUGIN_URL . 'build/assets/index.css',
                'js_vendor_url' => LIFESMART_CALCULATOR_PLUGIN_URL . 'build/assets/vendor.js',
                'js_charts_url' => LIFESMART_CALCULATOR_PLUGIN_URL . 'build/assets/charts.js',
                'js_main_url' => LIFESMART_CALCULATOR_PLUGIN_URL . 'build/assets/index.js',
                'source' => 'local',
                'version' => LIFESMART_CALCULATOR_VERSION
            );
        } else {
            // Use CDN assets for production
            $this->asset_config = array(
                'css_url' => LIFESMART_CALCULATOR_CDN_CSS,
                'js_vendor_url' => LIFESMART_CALCULATOR_CDN_JS_VENDOR,
                'js_charts_url' => LIFESMART_CALCULATOR_CDN_JS_CHARTS,
                'js_main_url' => LIFESMART_CALCULATOR_CDN_JS_MAIN,
                'source' => 'cdn',
                'version' => LIFESMART_CALCULATOR_VERSION
            );
        }
    }
    
    /**
     * Get current hostname
     */
    private function get_current_hostname() {
        if (isset($_SERVER['HTTP_HOST'])) {
            return $_SERVER['HTTP_HOST'];
        }
        if (isset($_SERVER['SERVER_NAME'])) {
            return $_SERVER['SERVER_NAME'];
        }
        return 'localhost';
    }
    
    /**
     * Check if current environment is local
     */
    private function is_local_environment($hostname) {
        return strpos($hostname, '.local') !== false;
    }
    
    /**
     * Initialize the plugin
     */
    public function init() {
        // Load text domain for translations
        load_plugin_textdomain('lifesmart-calculator', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    /**
     * Add preload hints for better performance
     */
    public function add_preload_hints() {
        global $post;
        if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'lifesmart_calculator')) {
            // Preload CSS
            echo '<link rel="preload" href="' . esc_url($this->asset_config['css_url']) . '?ver=' . esc_attr($this->asset_config['version']) . '" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">';
            echo '<noscript><link rel="stylesheet" href="' . esc_url($this->asset_config['css_url']) . '?ver=' . esc_attr($this->asset_config['version']) . '"></noscript>';
            
            // Preload JavaScript chunks
            if (!empty($this->asset_config['js_vendor_url'])) {
                echo '<link rel="preload" href="' . esc_url($this->asset_config['js_vendor_url']) . '?ver=' . esc_attr($this->asset_config['version']) . '" as="script">';
            }
            if (!empty($this->asset_config['js_charts_url'])) {
                echo '<link rel="preload" href="' . esc_url($this->asset_config['js_charts_url']) . '?ver=' . esc_attr($this->asset_config['version']) . '" as="script">';
            }
            echo '<link rel="preload" href="' . esc_url($this->asset_config['js_main_url']) . '?ver=' . esc_attr($this->asset_config['version']) . '" as="script">';
        }
    }
    
    /**
     * Enqueue scripts and styles
     */
    public function enqueue_scripts() {
        // Only enqueue on pages that use the shortcode
        global $post;
        if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'lifesmart_calculator')) {
            $this->enqueue_calculator_assets();
        }
    }
    
    /**
     * Enqueue calculator assets
     */
    private function enqueue_calculator_assets() {
        // Enqueue CSS
        wp_enqueue_style(
            'lifesmart-calculator-css',
            $this->asset_config['css_url'],
            array(),
            $this->asset_config['version']
        );
        
        $dependencies = array();
        
        // Enqueue vendor chunk (React, ReactDOM)
        if (!empty($this->asset_config['js_vendor_url'])) {
            wp_enqueue_script(
                'lifesmart-calculator-vendor',
                $this->asset_config['js_vendor_url'],
                array(),
                $this->asset_config['version'],
                true
            );
            $dependencies[] = 'lifesmart-calculator-vendor';
        }
        
        // Enqueue charts chunk (Chart.js, react-chartjs-2)
        if (!empty($this->asset_config['js_charts_url'])) {
            wp_enqueue_script(
                'lifesmart-calculator-charts',
                $this->asset_config['js_charts_url'],
                $dependencies,
                $this->asset_config['version'],
                true
            );
            $dependencies[] = 'lifesmart-calculator-charts';
        }
        
        // Enqueue main JavaScript
        wp_enqueue_script(
            'lifesmart-calculator-main',
            $this->asset_config['js_main_url'],
            $dependencies,
            $this->asset_config['version'],
            true
        );
        
        // Add inline script for configuration
        wp_add_inline_script('lifesmart-calculator-main', $this->get_inline_config_script(), 'before');
    }
    
    /**
     * Add type="module" attribute to script tags
     */
    public function add_type_module_attribute($tag, $handle, $src) {
        // Add type="module" to our calculator scripts
        if (strpos($handle, 'lifesmart-calculator-') === 0) {
            // Remove any existing type attribute first
            $tag = preg_replace('/ type=["\'][^"\']*["\']/', '', $tag);
            // Add type="module" after the opening <script tag
            $tag = str_replace('<script ', '<script type="module" ', $tag);
        }
        return $tag;
    }
    
    /**
     * Get inline configuration script
     */
    private function get_inline_config_script() {
        return sprintf(
            'window.LifeSmartCalculator = window.LifeSmartCalculator || {}; window.LifeSmartCalculator.config = %s;',
            wp_json_encode(array(
                'version' => LIFESMART_CALCULATOR_VERSION,
                'source' => $this->asset_config['source'],
                'hostname' => $this->get_current_hostname(),
                'cdnBase' => LIFESMART_CALCULATOR_CDN_BASE
            ))
        );
    }
    
    /**
     * Render the shortcode
     * 
     * @param array $atts Shortcode attributes
     * @param string $content Shortcode content
     * @return string HTML output
     */
    public function render_shortcode($atts = array(), $content = '') {
        // Parse shortcode attributes
        $atts = shortcode_atts(array(
            'theme' => 'default',
            'width' => '100%',
            'height' => 'auto',
            'class' => '',
            'id' => 'lifesmart-calculator-' . uniqid(),
            'mode' => 'auto', // auto, light, dark
            'transparent-background' => 'false', // true, false
        ), $atts, 'lifesmart_calculator');
        
        // Validate mode attribute
        $valid_modes = array('auto', 'light', 'dark');
        $mode = in_array(strtolower($atts['mode']), $valid_modes) ? strtolower($atts['mode']) : 'auto';
        
        // Validate transparent-background attribute
        $transparent_bg = filter_var($atts['transparent-background'], FILTER_VALIDATE_BOOLEAN);
        
        // Ensure assets are loaded
        $this->enqueue_calculator_assets();
        
        // Generate unique container ID
        $container_id = sanitize_html_class($atts['id']);
        
        // Build container classes
        $container_classes = array('lifesmart-calculator-container');
        if (!empty($atts['class'])) {
            $container_classes[] = sanitize_html_class($atts['class']);
        }
        if (!empty($atts['theme'])) {
            $container_classes[] = 'theme-' . sanitize_html_class($atts['theme']);
        }
        $container_classes[] = 'source-' . $this->asset_config['source'];
        
        // Build container styles
        $container_styles = array();
        if (!empty($atts['width'])) {
            $container_styles[] = 'width: ' . esc_attr($atts['width']);
        }
        if (!empty($atts['height']) && $atts['height'] !== 'auto') {
            $container_styles[] = 'height: ' . esc_attr($atts['height']);
        }
        
        // Start output buffering
        ob_start();
        ?>
        <div id="<?php echo esc_attr($container_id); ?>" 
             class="<?php echo esc_attr(implode(' ', $container_classes)); ?>"
             <?php if (!empty($container_styles)): ?>style="<?php echo esc_attr(implode('; ', $container_styles)); ?>"<?php endif; ?>
             data-source="<?php echo esc_attr($this->asset_config['source']); ?>"
             data-version="<?php echo esc_attr(LIFESMART_CALCULATOR_VERSION); ?>"
             data-mode="<?php echo esc_attr($mode); ?>"
             data-transparent-background="<?php echo esc_attr($transparent_bg ? 'true' : 'false'); ?>">
            <div id="root" class="lifesmart-calculator-root">
                <!-- React app will be rendered here -->
                <div class="lifesmart-calculator-loading">
                    <div class="loading-spinner">
                        <div class="spinner"></div>
                        <p><?php _e('Loading calculator...', 'lifesmart-calculator'); ?></p>
                    </div>
                </div>
            </div>
        </div>
        
        <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize the React app when DOM is ready
            const container = document.getElementById('<?php echo esc_js($container_id); ?>');
            if (container) {
                // Add loading styles
                const style = document.createElement('style');
                style.textContent = `
                    .lifesmart-calculator-loading {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 400px;
                        background: #f9fafb;
                        border-radius: 8px;
                        border: 1px solid #e5e7eb;
                    }
                    .loading-spinner {
                        text-align: center;
                    }
                    .spinner {
                        width: 40px;
                        height: 40px;
                        border: 4px solid #f3f4f6;
                        border-top: 4px solid #3b82f6;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 16px;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    .loading-spinner p {
                        color: #6b7280;
                        font-size: 14px;
                        margin: 0;
                    }
                `;
                document.head.appendChild(style);
                window.addEventListener('error', function(e) {
                    if (e.filename && (e.filename.includes('lifesmart-calculator') || e.filename.includes('main.'))) {
                        console.error('LifeSmart Calculator Error:', e.error);
                        const loadingDiv = container.querySelector('.lifesmart-calculator-loading');
                        if (loadingDiv) {
                            loadingDiv.innerHTML = `
                                <div style="text-align: center; color: #ef4444;">
                                    <h3>Error Loading Calculator</h3>
                                    <p>Please refresh the page or contact support.</p>
                                    <small>Source: <?php echo esc_js($this->asset_config['source']); ?></small>
                                </div>
                            `;
                        }
                    }
                });
            }
        });
        </script>
        <?php
        
        return ob_get_clean();
    }
    
    /**
     * Get plugin information
     */
    public function get_plugin_info() {
        return array(
            'version' => LIFESMART_CALCULATOR_VERSION,
            'source' => $this->asset_config['source'],
            'hostname' => $this->get_current_hostname(),
            'is_local' => $this->is_local_environment($this->get_current_hostname()),
            'asset_config' => $this->asset_config
        );
    }
}

// Initialize the plugin
LifeSmartCalculator::get_instance();

/**
 * Activation hook
 */
register_activation_hook(__FILE__, function() {
    // Flush rewrite rules on activation
    flush_rewrite_rules();
    
    // Add activation notice
    add_option('lifesmart_calculator_activation_notice', true);
});

/**
 * Deactivation hook
 */
register_deactivation_hook(__FILE__, function() {
    // Flush rewrite rules on deactivation
    flush_rewrite_rules();
});

/**
 * Show activation notice
 */
add_action('admin_notices', function() {
    if (get_option('lifesmart_calculator_activation_notice')) {
        echo '<div class="notice notice-success is-dismissible">';
        echo '<p><strong>LifeSmart Calculator activated!</strong> Use the shortcode <code>[lifesmart_calculator]</code> in your posts or pages.</p>';
        echo '</div>';
        delete_option('lifesmart_calculator_activation_notice');
    }
});

/**
 * Add plugin action links
 */
add_filter('plugin_action_links_' . plugin_basename(__FILE__), function($links) {
    $settings_link = '<a href="https://lifesmart-calculator.com/documentation" target="_blank">' . __('Documentation', 'lifesmart-calculator') . '</a>';
    array_unshift($links, $settings_link);
    return $links;
});

/**
 * Add meta links
 */
add_filter('plugin_row_meta', function($links, $file) {
    if (plugin_basename(__FILE__) === $file) {
        $links[] = '<a href="https://lifesmart-calculator.com/support" target="_blank">' . __('Support', 'lifesmart-calculator') . '</a>';
        $links[] = '<a href="https://github.com/lifesmart-calculator/wordpress-plugin" target="_blank">' . __('GitHub', 'lifesmart-calculator') . '</a>';
    }
    return $links;
}, 10, 2);
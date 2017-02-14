<?php
/*
Plugin Name: Foundation Columns
Plugin URI: http://tormorten.no
Description: Use the Zurb Foundation Grid System in WordPress posts and pages
Version: 0.8
Author: Tor Morten Jensen
Author URI: http://tormorten.no
*/

/**
 * Copyright (c) 2015 Tor Morten Jensen. All rights reserved.
 *
 * Released under the GPL license
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * This is an add-on for WordPress
 * http://wordpress.org/
 *
 * **********************************************************************
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * **********************************************************************
 */

if ( ! defined( 'ABSPATH' ) ) {
    die( 'Access denied.' );
}

/**
 * The name of the plugin
 **/
define( 'FCOL_NAME', 'Foundation Columns' );

/**
 * The minimum required PHP version
 **/
define( 'FCOL_REQUIRED_PHP_VERSION', '5' );

/**
 * The minimum required WordPress version
 **/
define( 'FCOL_REQUIRED_WP_VERSION', '3.7' );


final class Foundation_Columns {

    /**
     * Foundation version.
     *
     * @var string
     */
    public $version = '0.9';

    /**
     * The single instance of the class.
     *
     * @var Foundation_Columns
     * @since 0.9
     */
    protected static $_instance = null;


    /**
     * Main Foundation Instance.
     *
     * Ensures only one instance of Foundation is loaded or can be loaded.
     *
     * @since 0.9
     * @static
     * @see FC()
     * @return Foundation_Columns
     */
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Cloning is forbidden.
     *
     * @since 0.9
     */
    public function __clone() {
        _doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'foundation-columns' ), '2.1' );
    }

    /**
     * Unserializing instances of this class is forbidden.
     *
     * @since 0.9
     */
    public function __wakeup() {
        _doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'foundation-columns' ), '2.1' );
    }

    /**
     * Auto-load in-accessible properties on demand.
     *
     * @param mixed
     * @return mixed
     * @since 0.9
     */
    public function __get( $key ) {
    }

    /**
     * Foundation Constructor.
     */
    public function __construct() {
        if( $this->requirements_met() ) {

            // load textdomain
            add_action( 'plugins_loaded', array( $this, 'textdomain' ) );

            // add shortcodes
            add_shortcode( 'fc', array( $this, 'shortcode' ) );
            add_shortcode( 'fc_grid', array( $this, 'grid' ) );
            add_shortcode( 'fc_item', array( $this, 'item' ) );

            // add class to the body
            add_filter( 'post_class', array( $this, 'posts_class' ), 1, 3 );

            // modify the content
            add_filter( 'the_content', array( $this, 'content' ), 1 );
            remove_filter( 'the_content', 'wpautop' ); // move the autop filter
            add_filter( 'the_content', 'wpautop' , 99); // amend
            add_filter( 'the_content', 'shortcode_unautop',100 ); // remove autop inside shortcodes

            // create an array of data to send to the JS
            add_action( 'admin_enqueue_scripts', array( $this, 'data') );

            // add buttons
            add_action( 'init', array( $this, 'buttonhooks' ) );

            // add css for the icon
            add_action( 'admin_head', array( $this, 'icon' ), 999 );

            // add languages array
            add_filter( 'mce_external_languages', array( $this, 'localization' ) );
        }
        else {
            // error on requirements not met
            add_action( 'admin_notices', array( $this, 'error' ) );
        }
    }

    /**
     * Passes data to the TinyMCE plugin
     * @return void
     */
    public function data() {
        wp_localize_script( 'wp-embed', 'FoundationColumns', array(
            'columns' => apply_filters( 'foundation_columns_count', 12 ), // use this filter if your grid has more columns
        ) );
    }

    /**
     * Checks if the system requirements are met
     *
     * @return bool True if system requirements are met, false if not
     */
    function requirements_met() {
        global $wp_version;

        // check if the current php version matches our minimum requirements
        if ( version_compare( PHP_VERSION, FCOL_REQUIRED_PHP_VERSION, '<' ) ) {
            return false;
        }

        // check if the current wordpress version matches our minimum requirements
        if ( version_compare( $wp_version, FCOL_REQUIRED_WP_VERSION, '<' ) ) {
            return false;
        }

        // all checks passed
        return true;
    }

    /**
     * Localize the plugin
     *
     * @return void
     */
    function textdomain() {
        $domain = 'foundation_columns';
        $locale = apply_filters( 'plugin_locale', get_locale(), $domain );
        load_textdomain( $domain, WP_LANG_DIR.'/'.$domain.'/'.$domain.'-'.$locale.'.mo' );
        load_plugin_textdomain( $domain, FALSE, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );
    }

    /**
     * Shortcode function for the main grid system
     *
     * @param array|string $atts Shortcode attributes
     * @param string $content The content inside the shortcode
     * @return string Column Formatted
     */
    function shortcode( $atts, $content = null ) {

        $atts = extract( shortcode_atts( array( 'cols' => '' ),$atts ) );

        if( $cols ) {

            $return = '<div class="'. $cols .' columns">';
                $return .= '<p>';
                    $return .= do_shortcode($content);
                $return .= '</p>';
            $return .= '</div>';

        }

        return $return;

    }

    /**
     * Shortcode function for the block grid
     *
     * @param array|string $atts Shortcode attributes
     * @param string $content The content inside the shortcode
     * @return string A block grid
     */
    function shortcode_grid( $atts, $content = null ) {

        $atts = extract( shortcode_atts( array( 'cols' => '' ),$atts ) );

        if( $cols ) {

            $return = '<ul class="'. $cols .'">';

            $return .= do_shortcode( $content );

            $return .= '</ul>';

        }

        return $return;

    }

    /**
     * Shortcode function for the block grid items
     *
     * @param array|string $atts Shortcode attributes
     * @param string $content The content inside the shortcode
     * @return string A block grid item
     */
    function shortcode_item( $atts, $content = null ) {

        $return = '<li>';
        $return .= do_shortcode($content);
        $return .= '</li>';

        return $return;

    }

    /**
     * Add a class to posts_class if shortcode is present
     *
     * @param array $classes An array of classes
     * @param string $class The current class
     * @param integer $post_id The post ID
     * @return array Modified classes
     */
    function posts_class( $classes, $class, $post_id ) {

        $post = get_post($post_id);

        if( has_shortcode( $post->post_content, 'fc' ) || has_shortcode( $post->post_content, 'fc_grid' ) ) {
            $classes[] = 'has-foundation-columns';
        }

        return $classes;

    }

    /**
     * Filters the content and puts a row around if the [fc]-shortcode is present
     *
     * @param string $content The posts content
     * @return string Modified post content
     */
    function content($content) {
        if(has_shortcode( $content, 'fc' )) {

            $paragraphs = explode("\r\n", $content);

            $fixedParagraphs = array();
            $i = 0;

            // fix problem with br
            foreach ($paragraphs as $paragraph){
                if($paragraph !== '') {
                    $fixedParagraphs[$i] = $paragraph."\r\n";

                   if(substr($paragraph, 0, 3) == '[fc' || substr($paragraph, 0, 4) == '[/fc')
                        $i++;
                }
                else{
                    $i++;
                }
            }

            $new_content = '';

            foreach($fixedParagraphs as $paragraph) {
                if(substr($paragraph, 0, 3) == '[fc' || substr($paragraph, 0, 4) == '[/fc')
                    $new_content .= $paragraph;
                else {
                    $new_content .= '<div class="small-12 columns"><p>';
                    $new_content .= $paragraph;
                    $new_content .= '</p></div>';
                }
            }

            $return = '<div class="row">';
            $return .= $new_content;
            $return .= '</div>';
            $return = str_replace('<p></p>', '', $return);
        }
        else {
            $return = $content;
        }


        return $return;

    }

    /**
     * Add buttons to the TinyMCE-editor
     *
     * @return void
     */
    function buttonhooks() {
        if ( ( current_user_can('edit_posts') || current_user_can('edit_pages') ) && get_user_option('rich_editing') ) {
            add_filter( 'mce_external_plugins', array($this, 'register_tinymce_javascript' ) );
            add_filter( 'mce_buttons', array( $this, 'register_buttons' ) );
        }
    }

    /**
     * Registers the buttons
     *
     * @param array $buttons All buttons
     * @return array All buttons
     */
    function register_buttons($buttons) {
        array_push($buttons, "separator", "foundation_columns");
        return $buttons;
    }

    /**
     * Adds the JavaScript used for the grid system in the editor
     *
     * @param array $plugin_array An array of tinyMCE plugins
     * @return array TinyMCE plugins
     */
    function register_tinymce_javascript($plugin_array) {
        $debug = defined( 'SCRIPT_DEBUG' ) ? SCRIPT_DEBUG : false;
        $plugin_array['foundation_columns'] = plugins_url( '/assets/js/foundation_columns'. ( $debug ? '.min' : '' ) .'.js', __FILE__ );
        return $plugin_array;
    }

    /**
     * Create an icon for the TinyMCE-menu
     *
     * @return void
     */
    function icon() {
        if( is_admin() ) {
            ?>
            <style type="text/css">
            .mce-i-zurb-icon {
                background: url('<?php echo plugins_url('/assets/img/foundation_columns_20x20.png',__file__); ?>') no-repeat!important;
            }
            </style>
            <?php
        }
    }

    /**
     * Languages for the dialog
     *
     * @param array $mce_external_languages Existing translations
     * @return array Translation
     */
    function localization( $mce_external_languages ) {
        $mce_external_languages[ 'foundation_columns' ] = plugin_dir_path( __FILE__ ) . 'localization.php';
        return $mce_external_languages;
    }

    /**
     * Throw and error upon activation if requirements are not met
     *
     * @return void An error message
     */
    function error() {
        global $wp_version;
        ?>
        <div class="error">
            <p><?php echo FCOL_NAME; ?> error: Your environment doesn't meet all of the system requirements listed below.</p>

            <ul class="ul-disc">
                <li>
                    <strong>PHP <?php echo FCOL_REQUIRED_PHP_VERSION; ?>+</strong>
                    <em>(You're running version <?php echo PHP_VERSION; ?>)</em>
                </li>

                <li>
                    <strong>WordPress <?php echo FCOL_REQUIRED_WP_VERSION; ?>+</strong>
                    <em>(You're running version <?php echo esc_html( $wp_version ); ?>)</em>
                </li>
            </ul>

            <p>If you need to upgrade your version of PHP you can ask your hosting company for assistance, and if you need help upgrading WordPress you can refer to <a href="http://codex.wordpress.org/Upgrading_WordPress">the Codex</a>.</p>

            <p>You might be getting this error if there is already an instance of the plugin installed.</p>
        </div>
        <?php
    }
}

/**
 * Fetches the single formie instance
 */
function FCOL() {
    return Foundation_Columns::instance();
}

$GLOBALS['foundation-columns'] = FCOL();

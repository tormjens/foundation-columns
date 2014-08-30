<?php

/*
Plugin Name: Foundation Columns
Plugin URI: http://tormorten.no
Description: Use the Zurb Foundation Grid System in WordPress posts and pages
Version: 0.5
Author: Tor Morten Jensen
Author URI: http://tormorten.no
*/

/**
 * Copyright (c) 2014 Tor Morten Jensen. All rights reserved.
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

define( 'FCOL_NAME',                 'Foundation Columns' );
define( 'FCOL_REQUIRED_PHP_VERSION', '5' );
define( 'FCOL_REQUIRED_WP_VERSION',  '3.7' );

/**
 * Checks if the system requirements are met
 *
 * @return bool True if system requirements are met, false if not
 */
function foundation_columns_requirements_met() {
	global $wp_version;

	if ( version_compare( PHP_VERSION, FCOL_REQUIRED_PHP_VERSION, '<' ) ) {
		return false;
	}

	if ( version_compare( $wp_version, FCOL_REQUIRED_WP_VERSION, '<' ) ) {
		return false;
	}

	if ( function_exists('foundation_columns') ) {
		return false;
	}

	return true;
}

if( foundation_columns_requirements_met() ) {

	/**
	 * Localize the plugin
	 *
	 * @return 
	 */

	function plugin_textdomain() {
		
		$domain = 'foundation_columns';
		$locale = apply_filters( 'plugin_locale', get_locale(), $domain );
		load_textdomain( $domain, WP_LANG_DIR.'/'.$domain.'/'.$domain.'-'.$locale.'.mo' );
		load_plugin_textdomain( $domain, FALSE, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );
			
	} 

	/**
	 * Shortcode function for the main grid system
	 *
	 * @return string 
	 */

	function foundation_columns( $atts, $content = null ) {

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

	add_shortcode( 'fc','foundation_columns' );

	/**
	 * Shortcode function for the block grid
	 *
	 * @return string 
	 */

	function foundation_columns_grid( $atts, $content = null ) {

		$atts = extract( shortcode_atts( array( 'cols' => '' ),$atts ) );

		if( $cols ) {

			$return = '<ul class="'. $cols .'">';

			$return .= do_shortcode( $content );

			$return .= '</ul>';

		}

		return $return;

	}

	add_shortcode( 'fc_grid','foundation_columns_grid' );

	/**
	 * Shortcode function for the block grid items
	 *
	 * @return string 
	 */

	function foundation_columns_item( $atts, $content = null ) {
	
		$return = '<li>';
		$return .= do_shortcode($content);
		$return .= '</li>';

		return $return;

	}

	add_shortcode( 'fc_item','foundation_columns_item' );

	/**
	 * Filters the content and puts a row around if the [fc]-shortcode is present
	 *
	 * @return string
	 */

	function foundation_columns_content($content) {
		
		if(strpos($content, 'columns') != false) {
			$found = true;
		}

		if(has_shortcode( $content, 'fc' )) {
			$return = '<div class="row">';
			$return .= $content;
			$return .= '</div>';
			$return = str_replace('<p></p>', '', $return);
		}
		else {
			$return = $content;
		}


		return $return;

	}

	add_filter('the_content', 'foundation_columns_content', 1);
	remove_filter( 'the_content', 'wpautop' ); // move the autop filter
	add_filter( 'the_content', 'wpautop' , 99); // amend
	add_filter( 'the_content', 'shortcode_unautop',100 ); // remove autop inside shortcodes

	/**
	 * Add buttons to the TinyMCE-editor
	 *
	 * @return 
	 */

	function foundation_columns_buttonhooks() {
	   	if ( ( current_user_can('edit_posts') || current_user_can('edit_pages') ) && get_user_option('rich_editing') ) {
	    	add_filter("mce_external_plugins", "foundation_columns_register_tinymce_javascript");
	    	add_filter('mce_buttons', 'foundation_columns_register_buttons');
	    }
	}
	 
	function foundation_columns_register_buttons($buttons) {
	   	array_push($buttons, "separator", "foundation_columns");
	   	return $buttons;
	}

	/**
	 * Adds the JavaScript used for the grid system in the editor
	 *
	 * @return array
	 */

	function foundation_columns_register_tinymce_javascript($plugin_array) {
	   	$plugin_array['foundation_columns'] = plugins_url('/foundation_columns.js',__file__);
	   	return $plugin_array;
	}
	 
	add_action('init', 'foundation_columns_buttonhooks');

	/**
	 * Create an icon for the TinyMCE-menu
	 *
	 * @return 
	 */

	add_action( 'admin_head', 'foundation_columns_icon', 999 );

	function foundation_columns_icon() {

		if( is_admin() ) {

			?>
			<style type="text/css">
			.mce-i-zurb-icon {
				background: url('<?php echo plugins_url('/foundation_columns_20x20.png',__file__); ?>') no-repeat!important;
			}
			</style>
			<?php

		}

	}

	/**
	 * Languages for the dialog
	 *
	 * @return array
	 */

	add_filter( 'mce_external_languages', 'foundation_columns_localization' );

	function foundation_columns_localization( $mce_external_languages ) {
		$mce_external_languages[ 'foundation_columns' ] = plugin_dir_path( __FILE__ ) . 'localization.php';
		return $mce_external_languages;
	}

}
else {

	add_action( 'admin_notices', 'foundation_columns_error' );

}



/**
 * Throw and error upon activation if requirements are not met
 *
 * @return 
 */

function foundation_columns_error() {

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

?>
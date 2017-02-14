=== Foundation Columns ===
Contributors: tormorten
Donate link: http://tormorten.no/
Tags: foundation, zurb, columns, grid
Requires at least: 3.7
Tested up to: 4.7.2
Stable tag: 0.9
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Use the Zurb Foundation-grid and block grid in all your posts, pages and custom post types.

== Description ==

Adds support for using Zurb's Foundation grid-system via shortcodes in WordPress' TinyMCE editor.

For more information about Foundation, please [read the docs](http://foundation.zurb.com/docs/ "Zurb Foundation").

This plugin is compatible with version 5 and version 6 of Foundation, and includes support for small, medium and large breakpoints.

Now also with support for block grids.

**Modifying the grid**

If your grid has more than the default 12 columns you can use the `foundation_columns_count` filter.
`

add_filter( 'foundation_columns_count', function($count) {
  $count = 16;
  return $count;
} );

`

If you would like to contribute to this plugin. Please open a pull request on [Github](https://github.com/tormjens/foundation-columns)

**Please note:** This plugin does not install Foundation for you and therefore require that you use a theme built on Foundation.

== Installation ==

1. Upload the folder `foundation-columns` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Have fun using Foundation in the TinyMCE-editor.

== Frequently Asked Questions ==

= How do I use the grid? =

Simply highlight a section of text in your Visual Editor while creating a new or editing a page and click the "Zurb"-icon in the editor's toolbar. Follow the steps and the shortcodes should be inserted around your selected text.

= I don't want small and medium, just the large breakpoint. How do I do it? =

If you don't want all the breakpoints you can just click "OK" while prompted for a number. This will tell the plugin to skip adding those breakpoints.

= Text that I don't put in columns are not aligned with rest of the site. =

Foundation Columns adds a row to posts where the shortcode is detected. Recommended is that you put all your content in columns to make sure it gets the right padding.

== Screenshots ==

1. The Zurb icon indicates you are ready to use Foundation Columns.
2. The result after added columns.

== Changelog ==

= 0.9 =
* Move to a class based pattern.
* Added filter that allows changing the number of columns in the grid.
* Supports up to WP 4.7.2

= 0.8 =
* Fixes an issue where normal linebreaks was converted to tags. Thanks to [etlam](https://github.com/etlam)

= 0.5 =
* Added support for blog grids
* Moved from prompt to popup

= 0.4 =
* The first version of the plugin.

== Upgrade Notice ==

No information yet.

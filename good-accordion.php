<?php
/**
 * Plugin Name:       Good Accordion
 * Description:       FAQ / Accordion Block.
 * Version:           1.0.2
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Hollands Spoor
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       accordion
 *
 * @package 
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the blocks using the metadata from both the `block.json` files.
 * 
 */
function hs_blocks_php_accordion_blocks_init() {
	register_block_type( __DIR__ . '/build/accordion' );
	register_block_type( 
		__DIR__ . '/build/accordion-pane',
		array( 'parent' => 'hs-blocks/accordion' 
		) 
	);
	wp_set_script_translations( 'hs-blocks-accordion-editor-script', 'accordion', plugin_dir_path( __FILE__ ) . 'languages' );
}

add_action( 'init', 'hs_blocks_php_accordion_blocks_init' );

/**
 * Enqueue dashicons for frontend when used.
 * This function loads the Dashicons style for use in the front-end.
 */
//function ww_load_dashicons(){
//	wp_enqueue_style('dashicons');
//}
//add_action('wp_enqueue_scripts', 'ww_load_dashicons');
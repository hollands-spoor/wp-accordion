<?php
/**
 * Plugin Name:       Good Accordion
 * Description:       FAQ / Accordion Block.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Hollands Spoor
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       good-accordion
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



function hs_blocks_enqueue_custom_scripts() {
    // Deregister the automatically enqueued view script
    wp_deregister_script( 'hs-blocks-accordion-view-script' );

    // Enqueue the script manually with jQuery as a dependency
    wp_enqueue_script(
        'hs-blocks-accordion-view-script',
        plugins_url( 'src/accordion/view.js', __FILE__ ),
        array( 'jquery' ), // Add jQuery as a dependency
        '1.0.0',
        true // Load in the footer
    );
}
add_action( 'wp_enqueue_scripts', 'hs_blocks_enqueue_custom_scripts', 20 );
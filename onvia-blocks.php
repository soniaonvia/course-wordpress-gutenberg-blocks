<?php
/**
 * Plugin Name:       Onvia Blocks
 * Description:       Plugin que contiene todos los bloques creados siguiendo el curso Gutenberg Block Development de Udemy.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           BETA
 * Author:            Onvia
 * Author URI:        https://onvia.es
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       onvia-blocks
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_custom_block_category($categories) {
	array_unshift($categories, [
		'slug' => 'onvia-blocks',
		'title' => 'Onvia Blocks',
	]);
	return $categories;
}
function register_my_onvia_blocks() {
	add_filter("block_categories_all", "create_custom_block_category");
	// Bloque Curvy
	register_block_type( __DIR__ . '/build/blocks/curvy' );
}
add_action('init', 'register_my_onvia_blocks');

// function bootstrap_scripts() {
//     wp_enqueue_style('bootstrapstyles', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
//     wp_enqueue_script('bootstrapscripts','https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', array('jquery'), '', true);
// }
// add_action('wp_enqueue_scripts', 'bootstrap_scripts');

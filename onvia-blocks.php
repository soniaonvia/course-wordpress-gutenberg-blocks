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
function register_my_onvia_blocks() {
	// Bloque Curvy
	register_block_type( __DIR__ . '/build/blocks/curvy' );
}
add_action('init', 'register_my_onvia_blocks');

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

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

namespace Onvia;

if (!defined("ABSPATH")) {
	die("Silence is golden.");
}

final class OnviaBlocks
{
	static function init()
	{
		add_action("enqueue_block_assets", function () {
			wp_enqueue_style("dashicons");
			$style_url = plugins_url("build/style-index.css", __FILE__);
			wp_enqueue_style("onvia-blocks-style", $style_url);
		});
		add_action('init', function () {
			add_filter("block_categories_all", function ($categories) {
				array_unshift($categories, [
					'slug' => 'onvia-blocks',
					'title' => 'Onvia Blocks',
				]);
				return $categories;
			});
			// Bloque Curvy
			register_block_type(__DIR__ . '/build/blocks/curvy');
			// Bloque Clicky Group
			register_block_type(__DIR__ . '/build/blocks/clickyGroup');
			// Bloque Clicky Button
			register_block_type(__DIR__ . '/build/blocks/clickyButton');
			// Bloque Piccy Gallery
			register_block_type(__DIR__ . '/build/blocks/piccyGallery');
			// Bloque Piccy Image
			register_block_type(__DIR__ . '/build/blocks/piccyImage');

			register_block_pattern_category("onvia-patterns", array("label" => __("Onvia patterns", "onvia-blocks")));
			register_block_pattern(
				"onvia-blocks/call-to-action",
				array(
					"categories" => array("onvia-patterns"),
					"title" => __("Onvia Blocks call to action", "onvia-blocks"),
					"description" => __("A heading, paragraph and clicky button block", "onvia-blocks"),
					"content" => '<!-- wp:heading {"textAlign":"center"} -->
					<h2 class="wp-block-heading has-text-align-center">lorem ipsum</h2>
					<!-- /wp:heading -->

					<!-- wp:paragraph {"align":"center"} -->
					<p class="has-text-align-center">hola</p>
					<!-- /wp:paragraph -->

					<!-- wp:onvia-blocks/clicky-group {"justifyContent":"center"} -->
					<!-- wp:onvia-blocks/clicky-button {"labelText":"Call to action","style":{"color":{"background":"#000000","text":"#ffffff"},"spacing":{"padding":{"top":"10px","bottom":"10px","left":"20px","right":"20px"}}}} /-->
					<!-- /wp:onvia-blocks/clicky-group -->'
				)
			);
			$script_url = plugins_url("build/index.js", __FILE__);
			wp_enqueue_script("onvia-blocks-script", $script_url, array("wp-blocks", "wp-element", "wp-editor"));

			$style_url = plugins_url("build/style-index.css", __FILE__);
			wp_enqueue_style("onvia-blocks-style", $style_url);
		});
	}

	static function convert_custom_properties($value)
	{
		$prefix = 'var:';
		$prefix_len = strlen($prefix);
		$token_in = '|';
		$token_out = '--';
		if (str_starts_with($value, $prefix)) {
			$unwrapped_name = str_replace(
				$token_in,
				$token_out,
				substr($value, $prefix_len)
			);
			$value = "var(--wp--$unwrapped_name)";
		}

		return $value;
	}
}

OnviaBlocks::init();

// SCRIPTS DE BOOTSTRAP
// function bootstrap_scripts() {
//     wp_enqueue_style('bootstrapstyles', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
//     wp_enqueue_script('bootstrapscripts','https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', array('jquery'), '', true);
// }
// add_action('wp_enqueue_scripts', 'bootstrap_scripts');

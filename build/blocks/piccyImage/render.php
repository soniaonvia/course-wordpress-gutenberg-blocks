<?php
$image_exists = $attributes["imageId"] ?? null;
$block_wrapper_attributes = get_block_wrapper_attributes([
    "style" => 'display :' . ($image_exists ? 'block' : 'none')
]);
$image_uri = wp_get_attachment_image_url($attributes["imageId"] ?? 0);
$image_uri_large = wp_get_attachment_image_url($attributes["imageId"] ?? 0, "large");
?>

<div <?php echo $block_wrapper_attributes; ?>>
    <img data-large-size="<?php echo $image_uri_large; ?>" src="<?php echo $image_uri; ?>" class="thumb" />
</div>
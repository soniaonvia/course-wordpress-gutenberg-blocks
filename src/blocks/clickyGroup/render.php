<?php
$block_gap = convert_custom_properties($attributes["style"]["spacing"]["blockGap"] ?? 0);
// wp_send_json( $block_gap );
$block_wrapper_attributes = get_block_wrapper_attributes([
    "style" => "gap: " . $block_gap . "; justify-content: " . $attributes["justifyContent"],
]);
?>

<section <?php echo $block_wrapper_attributes; ?>>
    <?php echo $content; ?>
</section>
import {
    useBlockProps,
    InspectorControls,
      InnerBlocks
  } from "@wordpress/block-editor";
  import {
    PanelBody,
    ToggleControl,
  } from "@wordpress/components";

export default function edit() {
    const blockProps = useBlockProps();
    return <div {... blockProps}>clicky button edit</div>;
}
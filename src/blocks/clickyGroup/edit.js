import {
  useBlockProps,
  InspectorControls,
  InnerBlocks,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import metadata from "./block.json";
import "./editor.scss";

export default function Edit() {
  const blockProps = useBlockProps();
  return (
    <div {...blockProps}>
      <InnerBlocks
        template={[["onvia-blocks/clicky-button", {}]]}
        allowedBlocks={["onvia-blocks/clicky-button"]}
      />
    </div>
  );
}

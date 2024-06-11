import {
  useBlockProps,
  InspectorControls,
  useInnerBlocksProps,
  BlockControls,
  JustifyContentControl,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import metadata from "./block.json";
import { parseValue } from "../../utils/parseValue";
import "./editor.scss";

export default function Edit(props) {
  const blockGap = parseValue(props.attributes.style?.spacing?.blockGap || "");
  const blockProps = useBlockProps({
    style: {
      gap: blockGap,
      justifyContent: props.attributes.justifyContent
    },
  });
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    template: [["onvia-blocks/clicky-button", {}]],
    allowedBlocks: ["onvia-blocks/clicky-button"],
  });
  return (
    <>
      <BlockControls>
        <JustifyContentControl
          value={props.attributes.justifyContent}
          allowedControls={["left", "center", "right"]}
          onChange={(value) => 
            props.setAttributes({ justifyContent: value })}
        />
      </BlockControls>
      <div {...innerBlocksProps} />
    </>
  );
}

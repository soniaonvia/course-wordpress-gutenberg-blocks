import { __ } from "@wordpress/i18n";
import { ColorPalette } from "@wordpress/block-editor";
import { HorizontalRule, RangeControl, ToggleControl } from "@wordpress/components";
import metadata from "../block.json";

export const TopCurveSettings = (props) => {
  return (
    <>
      <HorizontalRule />

      <RangeControl
        label={__("Width", metadata.textdomain)}
        value={props.attributes.topWidth || 100}
        onChange={(value) => props.setAttributes({ topWidth: parseInt(value) })}
        min={100}
        max={300}
      />

      <RangeControl
        label={__("Height", metadata.textdomain)}
        value={props.attributes.topHeight}
        onChange={(value) =>
          props.setAttributes({ topHeight: parseInt(value) })
        }
        min={0}
        max={200}
      />

      <HorizontalRule />

      <div>
        <label>{__("Curve color", metadata.textdomain)}</label>
        <ColorPalette
          value={props.attributes.topColor}
          onChange={(value) => props.setAttributes({ topColor: value })}
        />
      </div>

      <HorizontalRule />

      <ToggleControl
        label={__("Flip horizontally", metadata.textdomain)}
        checked={props.attributes.topFlipX}
        onChange={(isChecked) => props.setAttributes({ topFlipX: isChecked })}
      />

      <ToggleControl
        label={__("Flip vertically", metadata.textdomain)}
        checked={props.attributes.topFlipY}
        onChange={(isChecked) => props.setAttributes({ topFlipY: isChecked })}
      />
    </>
  );
};

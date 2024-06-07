import { __ } from "@wordpress/i18n";
import { ColorPalette } from "@wordpress/block-editor";
import { HorizontalRule, RangeControl, ToggleControl } from "@wordpress/components";
import metadata from "../block.json";

export const BottomCurveSettings = (props) => {
  return (
    <>
      <HorizontalRule />

      <RangeControl
        label={__("Width", metadata.textdomain)}
        value={props.attributes.bottomWidth || 100}
        onChange={(value) => props.setAttributes({ bottomWidth: parseInt(value) })}
        min={100}
        max={300}
      />

      <RangeControl
        label={__("Height", metadata.textdomain)}
        value={props.attributes.bottomHeight}
        onChange={(value) =>
          props.setAttributes({ bottomHeight: parseInt(value) })
        }
        min={0}
        max={200}
      />

      <HorizontalRule />

      <div>
        <label>{__("Curve color", metadata.textdomain)}</label>
        <ColorPalette
          value={props.attributes.bottomColor}
          onChange={(value) => props.setAttributes({ bottomColor: value })}
        />
      </div>

      <HorizontalRule />

      <ToggleControl
        label={__("Flip horizontally", metadata.textdomain)}
        checked={props.attributes.bottomFlipX}
        onChange={(isChecked) => props.setAttributes({ bottomFlipX: isChecked })}
      />

      <ToggleControl
        label={__("Flip vertically", metadata.textdomain)}
        checked={props.attributes.bottomFlipY}
        onChange={(isChecked) => props.setAttributes({ bottomFlipY: isChecked })}
      />
    </>
  );
};

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
  useBlockProps,
  InspectorControls,
	InnerBlocks
} from "@wordpress/block-editor";
import {
  PanelBody,
  ToggleControl,
} from "@wordpress/components";

import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
import metadata from "./block.json";
import { Curve } from "./components/curve";
import { TopCurveSettings } from "./components/topCurveSettings";
import { BottomCurveSettings } from "./components/bottomCurveSettings";

export default function Edit(props) {
  const { className, ...blockProps } = useBlockProps();
  return (
    <>
      <section className={`${className} alignfull`} {...blockProps}>
        {props.attributes.enableTopCurve && (
          <Curve
            width={props.attributes.topWidth}
            height={props.attributes.topHeight}
            color={props.attributes.topColor}
            flipX={props.attributes.topFlipX}
            flipY={props.attributes.topFlipY}
          />
        )}
				<InnerBlocks />
        {props.attributes.enableBottomCurve && (
          <Curve
						isBottom
            width={props.attributes.bottomWidth}
            height={props.attributes.bottomHeight}
            color={props.attributes.bottomColor}
            flipX={props.attributes.bottomFlipX}
            flipY={props.attributes.bottomFlipY}
          />
        )}
      </section>
      <InspectorControls>
        <PanelBody title={__("Top curve", metadata.textdomain)}>
          <ToggleControl
            label={__("Enable top curve", metadata.textdomain)}
            checked={props.attributes.enableTopCurve}
            onChange={(isChecked) =>
              props.setAttributes({ enableTopCurve: isChecked })
            }
          />
          {props.attributes.enableTopCurve && (
            <TopCurveSettings
              attributes={props.attributes}
              setAttributes={props.setAttributes}
            />
          )}
        </PanelBody>

        <PanelBody title={__("Bottom curve", metadata.textdomain)}>
          <ToggleControl
            label={__("Enable bottom curve", metadata.textdomain)}
            checked={props.attributes.enableBottomCurve}
            onChange={(isChecked) =>
              props.setAttributes({ enableBottomCurve: isChecked })
            }
          />
          {props.attributes.enableBottomCurve && (
            <BottomCurveSettings
              attributes={props.attributes}
              setAttributes={props.setAttributes}
            />
          )}
        </PanelBody>
      </InspectorControls>
    </>
  );
}

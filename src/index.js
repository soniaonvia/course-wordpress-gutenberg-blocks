import {
  registerFormatType,
  applyFormat,
  toggleFormat,
  removeFormat,
} from "@wordpress/rich-text";
import { __ } from "@wordpress/i18n";
import { RichTextToolbarButton, ColorPalette } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import { Popover, PanelBody } from "@wordpress/components";
import lowHighlightIcon from "./assets/low-highlight.svg";
import lowHighlightIconActive from "./assets/low-highlight-active.svg";
import "./style.scss";

registerFormatType("onvia-blocks/low-highlight", {
  title: __("Low highlight", "onvia-blocks"),
  tagName: "span",
  className: "onvia-blocks-low-highlight",
  edit: ({ onChange, value, contentRef, isActive }) => {
    const [showColors, setShowColors] = useState(false);
    const lowHighlight = value.activeFormats?.find(
      (format) => format.type === "onvia-blocks/low-highlight"
    );
    const attributes = {
      ...(lowHighlight?.attributes || {}),
      ...(lowHighlight?.unregisteredAttributes || {}),
    };
    return (
      <>
        <RichTextToolbarButton
          icon={<img height={24} width={24} src={isActive ? lowHighlightIconActive : lowHighlightIcon} />}
          title={__("Low highlight", "onvia-blocks")}
          onClick={() => {
            setShowColors(true);
          }}
        />
        {!!showColors && (
          <Popover
            anchor={contentRef?.current}
            onClose={() => {
              setShowColors(false);
            }}
          >
            <PanelBody>
              <ColorPalette
                value={attributes?.["data-color"] || ""}
                onChange={(newValue) => {
                  if (newValue) {
                    onChange(
                      applyFormat(value, {
                        type: "onvia-blocks/low-highlight",
                        attributes: {
                          "data-color": newValue,
                          style: `background-image: linear-gradient(to right, ${newValue}, ${newValue})`,
                        },
                      })
                    );
                  } else {
                    onChange(removeFormat(value, "onvia-blocks/low-highlight"));
                  }
                }}
              />
            </PanelBody>
          </Popover>
        )}
      </>
    );
  },
});

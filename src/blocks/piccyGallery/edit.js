import {
  useBlockProps,
  BlockControls,
  InnerBlocks,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton, Icon } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import metadata from "./block.json";
import { useSelect } from "@wordpress/data";
import "./editor.scss";
import { ImageThumbnail } from "../components/imageThumbnail";

export default function edit(props) {
  const blockProps = useBlockProps();
  const innerBlocksProps = useInnerBlocksProps(
    {
      className: "piccy-gallery-inner-blocks",
    },
    {
      allowedBlocks: ["onvia-blocks/piccy-image"],
    }
  );
  const [editMode, setEditMode] = useState(true);
  const innerBlocks = useSelect(
    (select) => {
      const { getBlocksByClientId } = select("core/block-editor");
      const block = getBlocksByClientId(props.clientId)?.[0];
      return block?.innerBlocks;
    },
    [props.clientId]
  );
  const [previewMode, setPreviewMode] = useState({
    imageId: innerBlocks?.[0]?.attributes?.imageId,
    blockId: innerBlocks?.[0]?.clientId,
  });

  return (
    <>
      <div {...blockProps}>
        {!!editMode && (
          <div className="edit-mode">
            <span className="piccy-label">
              {__("Piccy image gallery", metadata.textdomain)}
            </span>
            <div {...innerBlocksProps} />
          </div>
        )}
        {!editMode && (
          <>
            <div className="preview-mode">
              {(innerBlocks || []).map((innerBlock) => (
                <ImageThumbnail
                  className={`thumb ${innerBlock.clientId === previewMode?.blockId ? "selected" : ""}`}
                  key={innerBlock.clientId}
                  imageId={innerBlock.attributes.imageId}
                  height={75}
                  onClick={() => {
                    setPreviewMode({
                      imageId: innerBlock.attributes.imageId,
                      blockId: innerBlock.clientId,
                    });
                  }}
                />
              ))}
            </div>
            <div>
              <ImageThumbnail imageId={previewMode?.imageId} height="initial" />
            </div>
          </>
        )}
      </div>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon={
              editMode ? (
                <Icon icon="welcome-view-site" />
              ) : (
                <Icon icon="edit" />
              )
            }
            label={
              editMode
                ? __("Preview gallery", metadata.textdomain)
                : __("Edit gallery", metadata.textdomain)
            }
            onClick={() => {
              setEditMode(!editMode);
            }} // toggle editMode
          />
        </ToolbarGroup>
      </BlockControls>
    </>
  );
}

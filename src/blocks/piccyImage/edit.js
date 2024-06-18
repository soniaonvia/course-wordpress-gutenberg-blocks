import {
  useBlockProps,
  MediaUploadCheck,
  MediaUpload,
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
// import { Icon } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import metadata from "./block.json";
import "./editor.scss";
import { useImage } from "../../hooks/useImage";
import { ImageThumbnail } from "../components/imageThumbnail";
// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPanorama } from "@fortawesome/free-solid-svg-icons";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function edit(props) {
  const blockProps = useBlockProps();
  const image = useImage(props.attributes.imageId);
  const imageSelected = !!props.attributes.imageId && !!image?.source_url;
  return (
    <div {...blockProps}>
      {!!imageSelected && (
        <ImageThumbnail imageId={props.attributes.imageId} />
      )}
      {!imageSelected && (
        <div className="no-image-selected">
          {/* <Icon icon="format-image"/>   */}
          <FontAwesomeIcon icon={faPanorama} style={{margin: "auto"}} />
        </div>
      )}
      <MediaUploadCheck>
        <MediaUpload
          allowedTypes={["image"]}
          render={({ open }) => {
            return (
              <button className="media-select" onClick={open}>
                {imageSelected ? __("Replace image", metadata.textdomain) : __("Select an image", metadata.textdomain)}
              </button>
            );
          }}
          value={props.attributes.imageId}
          onSelect={(item) => {
            props.setAttributes({
              imageId: item.id,
            });
          }}
        />
      </MediaUploadCheck>
    </div>
  );
}

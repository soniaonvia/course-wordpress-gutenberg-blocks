import { useImage } from "../../hooks/useImage";

export const ImageThumbnail = (props) => {
  const image = useImage(props.imageId);
  return image?.source_url ? (
    <img
      className={props.className}
      src={image.source_url}
      onClick={props.onClick}
      style={{
        display: "block",
        height: props.height || 150,
        width: "100%",
        objectFit: "cover",
      }}
    />
  ) : null;
};

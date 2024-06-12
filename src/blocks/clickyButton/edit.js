import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InspectorControls,
  InnerBlocks,
  RichText,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import metadata from "./block.json";

export default function edit(props) {
  const postTypes = useSelect((select) => {
    const data = select("core").getEntityRecords("root", "postType", {
      per_page: -1,
    });
    return data?.filter(
      (item) => item.visibility.show_in_nav_menus && item.visibility.show_ui
    );
  });
  const posts = useSelect((select) => {
    const data = select("core").getEntityRecords(
      "postType",
      props.attributes.postType,
      {
        per_page: -1,
      }
    );
    return data;
  }, [props.attributes.postType]);
  console.log({ posts })
  const blockProps = useBlockProps();
  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Destination", metadata.textdomain)}>
          <SelectControl
            label={__("Type", metadata.textdomain)}
            value={props.attributes.postType}
            onChange={(value) => {
              props.setAttributes({
                postType: value,
              });
            }}
            options={[
              {
                label: "Select a post type",
                value: "",
              },
              ...(postTypes || []).map((postType) => ({
                label: postType.labels.singular_name,
                value: postType.slug,
              })),
            ]}
          />
          {props.attributes.postType && (
            <SelectControl
              label={__(
                `Linked ${props.attributes.postType}`,
                metadata.textdomain
              )}
              value={props.attributes.linkedPost}
              onChange={(value) => {
                props.setAttributes({
                  linkedPost: value ? parseInt(value) : null,
                });
              }}
              options={[
                {
                  label: `Select a ${props.attributes.postType} to link to`,
                  value: "",
                },
                ...(posts || []).map((post) => ({
                  label: post.title.rendered,
                  value: post.id,
                })),
              ]}
            />
          )}
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <RichText
          placeholder="Label text"
          value={props.attributes.labelText}
          allowedFormats={[]}
          multiline={false}
          onSplit={() => {}}
          onReplace={() => {}}
          onChange={(value) => {
            props.setAttributes({ labelText: value });
          }}
        />
      </div>
    </>
  );
}

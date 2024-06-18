window.onload = () => {
  const galleries = Array.from(
    document.getElementsByClassName("wp-block-onvia-blocks-piccy-gallery")
  );

  galleries.forEach((gallery) => {
    const thumbnails = Array.from(gallery.getElementsByClassName("thumb"));
    const imagePreview = Array.from(
      gallery.getElementsByClassName("image-preview")
    );
    if (thumbnails?.[0]) {
      thumbnails[0].classList.add("selected");
      imagePreview[0].src = thumbnails[0].dataset.largeSize;
    }

    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", () => {
        const selected = Array.from(
          gallery.getElementsByClassName("thumb selected")
        );
        selected.forEach((image) => {
          image.classList.remove("selected");
        });
        thumbnail.classList.add("selected");
        imagePreview[0].src = thumbnail.dataset.largeSize;
      });
    });
  });
};

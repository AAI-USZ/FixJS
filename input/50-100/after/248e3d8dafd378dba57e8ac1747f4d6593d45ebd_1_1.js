function addImage(imagedata) {
  if (imagedata === null) { // No more images
    buildingUI = false;
    if (needsRebuild) {
      needsRebuild = false;
      rebuildUI();
    }
    return;
  }

  // If this is the first image we've found,
  // remove the "no images" message
  if (images.length === 0)
    document.getElementById('nophotos')
    .classList.add('hidden');

  images.push(imagedata);            // remember the image
  addThumbnail(images.length - 1);   // display its thumbnail
}
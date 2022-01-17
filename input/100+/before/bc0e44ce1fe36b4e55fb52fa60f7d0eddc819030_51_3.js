function deleteImage(n) {
  if (n < 0 || n >= images.length)
    return;

  // Remove the image from the array
  var deletedImageData = images.splice(n, 1)[0];

  // Delete the file from the MediaDB. This removes the db entry and
  // deletes the file in device storage. This method returns immediately
  // and the deletion happens asynchronously.
  photodb.deleteFile(deletedImageData.name);

  // Remove the corresponding thumbanail
  var thumbnailElts = thumbnails.querySelectorAll('.thumbnail');
  thumbnails.removeChild(thumbnailElts[n]);

  // Change the index associated with all the thumbnails after the deleted one
  // This keeps the data-index attribute of each thumbnail element in sync
  // with the images[] array.
  for (var i = n + 1; i < thumbnailElts.length; i++) {
    thumbnailElts[i].dataset.index = i - 1;
  }

  // Adjust currentPhotoIndex, too, if we have to.
  if (n < currentPhotoIndex)
    currentPhotoIndex--;

  // If we're in single photo display mode, then the only way this function,
  // gets called is when we delete the currently displayed photo.  This means
  // that we need to redisplay.
  if (currentView === photoView) {
    showPhoto(currentPhotoIndex);
  }
}
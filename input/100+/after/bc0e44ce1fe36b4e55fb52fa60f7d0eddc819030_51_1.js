function deleteImage(n) {
  if (n < 0 || n >= images.length)
    return;

  // Delete the file from the MediaDB. This removes the db entry and
  // deletes the file in device storage. This will generate an change
  // event which will call imageDeleted()
  photodb.deleteFile(images[n].name);
}
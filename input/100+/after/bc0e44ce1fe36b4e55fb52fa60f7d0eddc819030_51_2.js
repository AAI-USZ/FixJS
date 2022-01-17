function createThumbnailList() {
  // Enumerate existing image entries in the database and add thumbnails
  // List the all, and sort them in descending order by date.
  photodb.enumerate('metadata.date', null, 'prev', function(imagedata) {
    if (imagedata === null) // No more images
      return;
    
    // If this is the first image we've found,
    // remove the 'no images' message
    if (images.length === 0)
      $('nophotos').classList.add('hidden');
    
    images.push(imagedata);                             // remember the image
    var thumbnail = createThumbnail(images.length - 1); // create its thumbnail
    thumbnails.appendChild(thumbnail); // display the thumbnail
  });
}
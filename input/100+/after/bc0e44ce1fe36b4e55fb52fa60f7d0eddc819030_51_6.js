function fitImage(photoWidth, photoHeight, viewportWidth, viewportHeight) {
  var scalex = viewportWidth / photoWidth;
  var scaley = viewportHeight / photoHeight;
  var scale = Math.min(Math.min(scalex, scaley), 1);

  // Set the image size and position
  var width = Math.floor(photoWidth * scale);
  var height = Math.floor(photoHeight * scale);

  return {
    width: width,
    height: height,
    left: Math.floor((viewportWidth - width) / 2),
    top: Math.floor((viewportHeight - height) / 2),
    scale: scale
  };
}
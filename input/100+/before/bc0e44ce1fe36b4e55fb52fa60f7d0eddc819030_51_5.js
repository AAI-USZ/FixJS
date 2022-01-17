function displayImageInFrame(n, frame) {
  // Make sure n is in range
  if (n < 0 || n >= images.length)
    return;

  var img = frame.firstChild;

  // Asynchronously set the image url
  var imagedata = images[n];
  photodb.getFile(imagedata.name, function(file) {
    var url = URL.createObjectURL(file);
    img.src = url;
    img.onload = function() { URL.revokeObjectURL(url); };
  });

  // Figure out the size and position of the image
  var fit = fitImageToScreen(images[n].metadata.width,
                             images[n].metadata.height);
  var style = img.style;
  style.width = fit.width + 'px';
  style.height = fit.height + 'px';
  style.left = fit.left + 'px';
  style.top = fit.top + 'px';
}
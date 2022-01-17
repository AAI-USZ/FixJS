function resetPhoto(n, img) {
    if (!img || n < 0 || n >= images.length)
      return;

    var imagedata = images[n];
    var fit = fitImageToScreen(imagedata.metadata.width,
                               imagedata.metadata.height);
    var style = img.style;
    style.width = fit.width + 'px';
    style.height = fit.height + 'px';
    style.left = fit.left + 'px';
    style.top = fit.top + 'px';
  }
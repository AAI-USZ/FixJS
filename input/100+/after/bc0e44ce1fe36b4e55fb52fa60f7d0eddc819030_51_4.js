function resetPhoto(n, img) {
    if (!img || n < 0 || n >= images.length)
      return;

    var imagedata = images[n];
    var fit = fitImage(imagedata.metadata.width, imagedata.metadata.height,
                       photoView.offsetWidth, photoView.offsetHeight);
    var style = img.style;
    style.width = fit.width + 'px';
    style.height = fit.height + 'px';
    style.left = fit.left + 'px';
    style.top = fit.top + 'px';
  }
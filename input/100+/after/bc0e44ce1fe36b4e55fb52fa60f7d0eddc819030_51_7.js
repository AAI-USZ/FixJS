function() {
  // Store the display space we have for photos
  // call reset() when we get a resize or orientationchange event
  this.viewportWidth = photoFrames.offsetWidth;
  this.viewportHeight = photoFrames.offsetHeight;

  // Compute the default size and position of the image
  var fit = fitImage(this.photoWidth, this.photoHeight,
                     this.viewportWidth, this.viewportHeight);
  this.baseScale = fit.scale;
  this.width = fit.width;
  this.height = fit.height;
  this.top = fit.top;
  this.left = fit.left;

  // Start off with no zoom
  this.scale = 1;

  // We start off with no swipe from left to right
  this.swipe = 0;

  this._reposition(); // Apply the computed size and position
}
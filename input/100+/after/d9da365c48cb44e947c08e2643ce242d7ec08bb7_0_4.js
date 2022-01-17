function(aImageNode, aImageSrc, 
                          flags, image)
  {
    this._logger.trace("");
    this._logger.trace("_imageOnLoad");

    if (this._currentImage != aImageSrc) {
      // A different image than our current one finished loading; ignore it.
      return;
    }

    // This is the image URL we're currently loading (not another previously
    // image we had started loading).

    // Make sure we don't get called again as an onLoad, if current call
    // was due to the timer.
    image.onload = null;
    
    this._timer.cancel();
    
    let thumbWidth = aImageNode.clientWidth;
    let thumbHeight = aImageNode.clientHeight;
    
    /*
     * Get image size from naturalWidth, which tells us the image's true
     * size, uninfluenced by CSS
     */
    let imageWidth  = image.naturalWidth;
    let imageHeight = image.naturalHeight;
    if (imageWidth == 0 || imageHeight == 0) {
      // Some images (such as .svg Scalable Vector Graphics) don't always have
      // an explicit size.  Give it an arbitrary resolution, at which it'll
      // render.
      this._logger.debug("_imageOnLoad: got 0 width or height; using 1000.");
      imageWidth = 1000;
      // Use same aspect as thumb (not not too extreme since the thumb may actually
      // be long text in an <a> tag).
      let aspect = 1.0;
      if (thumbWidth != 0 && thumbHeight != 0) {
        aspect = thumbHeight / thumbWidth;
      }
      aspect = Math.min(4.0, Math.max(aspect, 0.25));
      imageHeight = imageWidth * aspect;
    }
    
    if (flags.requireImageBiggerThanThumb &&
        (thumbWidth  >= imageWidth ||
         thumbHeight >= imageHeight) ) {
      // skip
      // TODO: ought to allow if file types are different (like the
      // check already done in _sizePositionAndDisplayPopup).
      this._logger.debug("_imageOnLoad: skipping popup since requireImageBiggerThanThumb" +
                         " and thumb is " + thumbWidth + "x" + thumbHeight +
                         " which is >= than raw image " +
                         imageWidth + "x" + imageHeight);
      this._logToConsole("ThumbnailZoomPlus: skipping since too small: " + aImageSrc);
      // Make sure we close the 'working' status icon.
      this._closePanel(false);
    } else {
      if (flags.requireImageBiggerThanThumb) {
        this._logger.debug("_imageOnLoad: showing popup since requireImageBiggerThanThumb" +
                         " and thumb is " + thumbWidth + "x" + thumbHeight +
                         " which is < raw image " +
                         imageWidth + "x" + imageHeight);
      }
      this._currentThumb = aImageNode;
      this._origImageWidth = imageWidth;
      this._origImageHeight = imageHeight;
      
      let loadInTempImage = (image != this._panelHtmlImage);
      this._panelXulImage.hidden = ! loadInTempImage;
      this._panelHtmlImage.hidden = loadInTempImage;

      let displayed =
        this._sizePositionAndDisplayPopup(this._currentThumb, aImageSrc,
                                          flags, 
                                          this._origImageWidth, this._origImageHeight);
      if (displayed) {
        this._addListenersWhenPopupShown();
        this._addToHistory(aImageSrc);
      } else {
        this._hideCaption();
      }
    }
    
    if (image != this._panelHtmlImage) {
      // Help the garbage collector reclaim memory quickly.
      // (Test by watching "images" size in about:memory.)
      // This also prevents the image from restarting at the start
      // of image when it's done loading.
      image.src = null;
      image = null;
    }
  }
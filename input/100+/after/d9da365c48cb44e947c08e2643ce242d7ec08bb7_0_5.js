function(aImageNode, aImageSrc,
                                          flags, 
                                          imageWidth, imageHeight)
  {
    let pageZoom = gBrowser.selectedBrowser.markupDocumentViewer.fullZoom;
    
    let available = this._getAvailableSizeOutsideThumb(aImageNode, flags);
    let thumbWidth = aImageNode.offsetWidth * pageZoom;
    let thumbHeight = aImageNode.offsetHeight * pageZoom;
    
    // Get the popup image's display size, which is the largest we
    // can display the image (without magnifying it and without it
    // being too big to fit on-screen).
    let imageSize = this._getScaleDimensions(imageWidth, imageHeight, available,
                                             flags, thumbWidth, thumbHeight);
    let thumbSrc = aImageNode.getAttribute("src");
    let thumbType = this._getFileType(thumbSrc);
    let imageType = this._getFileType(aImageSrc);
    this._logger.debug("_sizePositionAndDisplayPopup: file types: thumb=" + 
                       thumbType + 
                       "; popup=" + imageType + " from thumb=" + 
                       aImageNode.localName + " " + thumbSrc + 
                       " and image=" + aImageSrc);
    if (! imageSize.allow) {
      if (thumbType != imageType) {
        // If file types are different, show it even if it's not bigger, since
        // it may be better quality or an animated gif from a static thumb.
        this._logger.debug("_sizePositionAndDisplayPopup: forcing allow since different file types"); 
        imageSize.allow = true;
      }
    }
    
    this._logger.debug("_sizePositionAndDisplayPopup: available w/l/r:" + available.width + 
                       "/" + available.left + 
                       "/" + available.right +
                       "; h/t/b:" + available.height + 
                       "/" + available.top + 
                       "/" + available.bottom + 
                       "; adj windowWidth, Height: " + 
                       available.windowWidth + "," + available.windowHeight);
    this._logger.debug("_sizePositionAndDisplayPopup: " + 
                       "; _currentMaxScaleBy=" + this._currentMaxScaleBy +
                       "; win width=" + content.window.innerWidth*pageZoom +
                       "; win height=" + content.window.innerHeight*pageZoom +
                       "; full-size image=["+imageWidth + "," + imageHeight + 
                       "]; max imageSize which fits=["+imageSize.width + "," + imageSize.height +"]"); 
    
    if (! imageSize.allow) {
      if (! flags.noTooSmallWarning) {
        // show the thumb's size as a % of raw image's size, so the user
        // can tell if it's worth opening the image in a tab to
        // see it bigger than could fit in the window.
        this._updateForActualScale(thumbWidth, imageWidth);
        this._showStatusIconBriefly(aImageNode, "tooSmall16.png", 32);      
        this._logToConsole("ThumbnailZoomPlus: too small (and warned): " + aImageSrc);
      } else {
        this._logger.debug("_sizePositionAndDisplayPopup: too small (but noTooSmallWarning)");
        this._logToConsole("ThumbnailZoomPlus: too small (silently): " + aImageSrc);
      }
      
      return false;
    }
    
    this._openAndPositionPopup(aImageNode, imageSize, available);
    this._updateForActualScale(imageSize.width, imageWidth);
    this._showPopupCursor();
    
    return true;
  }
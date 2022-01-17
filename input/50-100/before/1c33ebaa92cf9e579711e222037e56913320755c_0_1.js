function(aEvent) {
      that._logger.debug("In image onerror");

      if (that._currentImage != aImageSrc) {
        // A different image than our current one finished loading; ignore it.
        return;
      }
      that._hideCaption();
      that._logToConsole("ThumbnailZoomPlus: >>> error loading\n" + aImageSrc);
      that._logger.debug("image onerror: show warning briefly since error loading image (" + aEvent + ")");
      that._showStatusIconBriefly(aImageNode, "warning16.png", 32);      
      that._imageObjectBeingLoaded = null;
    }
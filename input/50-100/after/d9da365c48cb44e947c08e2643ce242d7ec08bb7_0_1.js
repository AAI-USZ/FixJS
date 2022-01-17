function(aEvent) {
    this._logger.trace("_handlePageLoaded");

    if (ThumbnailZoomPlus.logPath) {
      this._logToConsole("thumbnailZoomPlus: logging to " + ThumbnailZoomPlus.logPath);
    }
    
    let doc = aEvent.originalTarget;
    this._addEventListenersToDoc(doc);

    if (this._needToPopDown(doc.defaultView.top)) {
      // Detected that the user loaded a different page into our window, e.g.
      // by clicking a link.  So close the popup.
      this._logger.debug("_handlePageLoaded: *** closing since a page loaded into its host window");

      // A new document has been loaded so we can't access nodes from the
      // previous document anymore.  Clear them to avoid accessing dead
      // data (issue #75).
      this._panelCaption.ThumbnailZoomPlusOriginalTitleNode = null;
      this._originalCursorNode = null;
      this._currentThumb = null;
      
      this._closePanel(true);
    }
  }
function(aDocument, pageMatchNode, pageMatchHost,
                             aEvent, aPage, node) {
    var pageName = ThumbnailZoomPlus.FilterService.pageList[aPage].key;
    let requireImageBiggerThanThumb = false;
    let allow = ThumbnailZoomPlus.FilterService.isPageEnabled(aPage);
    if (! allow &&
        aPage == ThumbnailZoomPlus.Pages.Thumbnail.aPage &&
        ThumbnailZoomPlus.FilterService.isPageEnabled(ThumbnailZoomPlus.Pages.Others.aPage)) {
      // This is the "thumbnails" page, the "thumbnails" page is disabled, and
      // the "others" page is enabled.  Allow processing this under the "thumbnails"
      // page, but only if the actual raw image has higher resolution than the
      // thumbnal.  That allows the user to have Others on, Thumbnail off, and
      // still see popups for large images which are embedded as smaller
      // thumbs or images, as happens on tumblr for example.
      allow = true;
      requireImageBiggerThanThumb = true;
    }

    this._logger.debug("... _tryImageSource: Trying " +
                       (aDocument == pageMatchNode ? "page " : "image") +
                       " against '" + pageName +
                       "'");
    if (! ThumbnailZoomPlus.FilterService.testPageConstantByHost(pageMatchHost, aPage)) {
      return "rejectedPageMatchNode";
    }
    if (! allow) {
      // The rule for aPage is disabled in preferences.
      this._logger.debug("                            DISABLED is page " +
                         pageName );
      return "disabled";
    }
        
    let imageSourceInfo = ThumbnailZoomPlus.FilterService
                                .getImageSource(aDocument, node, aPage);
    let imageSource = imageSourceInfo.imageURL;
    
    // imageSourceNode is the node from which the full-size image's URL
    // is determined.  Node remains the node from which the hover event
    // was provoked.  This distinction is important because:
    // * We want to getZoomImage to use the node from what the URL will be determined
    // * When using a caption, we must clear .title on the event's node
    // * When checking whether the popup's file type is different than the
    //   thumb's, we need the node of the actual thumb, which is more likely
    //   to be the provoking node (since the Others rule typically returns
    //   a parent's <a> node).
    // TODO: ideally we might want to use imageSourceNode for positioning,
    // but still use node for captioning.
    let imageSourceNode = node;
    if (imageSourceInfo.node != null) {
      imageSourceNode = imageSourceInfo.node;
      if (imageSourceNode != node) {
        this._debugToConsole("ThumbnailZoomPlus: page " + pageName + ": imageSourceNode: <" +
                           imageSourceNode.localName.toLowerCase() + "> url: \n" +
                           String(imageSourceNode) + " \n" + imageSourceNode.getAttribute("src"));
      }
    }

    if (null == imageSource ||     
        ! ThumbnailZoomPlus.FilterService.filterImage(imageSource, aPage)) {
      this._debugToConsole("ThumbnailZoomPlus: page " + pageName + " imageRegExp rejected imageSource \n" +
                           imageSource);

      return "rejectedNode";
    }

    this._debugToConsole("ThumbnailZoomPlus: page " + pageName + " matches imageSource \n" +
                       imageSource);

    // Found a matching page with an image source!
    let flags = new ThumbnailZoomPlus.FilterService.PopupFlags();
    let zoomImageSrc = ThumbnailZoomPlus.FilterService
                            .getZoomImage(imageSource, imageSourceNode, flags, aPage);
    if (zoomImageSrc == "") {
      this._logger.debug("_tryImageSource: getZoomImage returned '' (matched but disabled by user).");
      this._debugToConsole("ThumbnailZoomPlus: page " + pageName + " getZoomImage rejected with ''");
      return "rejectedNode";
    }
    if (zoomImageSrc == null) {
      this._logger.debug("_tryImageSource: getZoomImage returned null.");
      this._debugToConsole("ThumbnailZoomPlus: page " + pageName + " getZoomImage rejected with null");
      return "rejectedNode";
    }

    // Test whether the link URL of the hovered-over node is the same as the full-size
    // image we're showing; indicate that clicking the link wouldn't be
    // useful by using our custom cursor on the link/thumb.
    // TODO: might want to also look for onclick and similar handlers which
    // might cause click to do something different than show this URL
    // (example: reddit.com).
    flags.linkSameAsImage = this._isLinkSameAsImage(imageSourceNode, zoomImageSrc);
    
    this._currentWindow = aDocument.defaultView.top;
    this._originalURI = this._currentWindow.document.documentURI;
    this._logger.debug("_tryImageSource: *** Setting _originalURI=" + 
                       this._originalURI);

    this._debugToConsole("ThumbnailZoomPlus: >>> page " + pageName + " launching \n" +
                       zoomImageSrc);
    
    flags.requireImageBiggerThanThumb = requireImageBiggerThanThumb;
    this._showZoomImage(zoomImageSrc, flags, node, aPage, aEvent);
    return "launched";
  }
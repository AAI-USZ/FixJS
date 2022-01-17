function(aDocument, aEvent, minFullPageNum, node) {
    this._logger.trace("_findPageAndShowImage"); 
    
    let pageZoom = gBrowser.selectedBrowser.markupDocumentViewer.fullZoom;
    let clientToScreenX = aEvent.screenX - aEvent.clientX * pageZoom;
    let clientToScreenY = aEvent.screenY - aEvent.clientY * pageZoom;
    this._thumbBBox = this._calcThumbBBox(node, 
                          clientToScreenX, clientToScreenY);

    /*
     * Try each maching page (rule), starting with the first one,
     * until we find one which can generate an image URL.  We actually
     * try each rule twice -- once matching the page itself and again
     * matching the image.
     *
     * For the page test, we don't test page rules smaller than minFullPageNum,
     * the first matching page determined in onLoad.
     *
     * As a speed optimization, we avoid trying rules we know won't pass.
     * That's important since this routine is called whenever the users moves
     * the mouse pointer into a different element -- even a different paragraph.
     */
    let docHost = ThumbnailZoomPlus.FilterService.getHostOfDoc(aDocument);
    let nodeHost = docHost;
    if (aDocument != node) {
      nodeHost = ThumbnailZoomPlus.FilterService.getHostOfDoc(node);
    }

    {
      let nodeName = node.localName.toLowerCase();
      let nodeClass = node.className;
      this._debugToConsole("ThumbnailZoomPlus: <<< SEEKING image for " +
                         "name=\"" + nodeName + "\" class=\"" + nodeClass + "\" url=\n"
                         + (node.getAttribute("src") || String(node))
                         + "  pageUrl=" + aDocument.documentURI
                         );
    }
         
    var disallowOthers = false;
    for (var aPage = 0 ; 
         aPage < ThumbnailZoomPlus.FilterService.pageList.length; 
         aPage++) {

      if (disallowOthers && this._isOthersThumbnailsPage(aPage)) {
        this._logger.debug("_findPageAndShowImage: Skipping Others or Thumbnails");
        continue;
      }
      
      let status="notTried";
      if (aPage >= minFullPageNum && docHost != null) {        
        status = this._tryImageSource(aDocument, aDocument, docHost, aEvent, aPage, node);
        if (status == "launched") {
          return;
        }
        if (status == "disabled" && ! this._isOthersThumbnailsPage(aPage)) {
          /*
           * If the host matches the page's host URL but the page is disabled,
           * then don't allow a popup due to the match-all pages
           * Others and Thumbnails.  The user means to disable the page so
           * we don't want to show popups from Others and Thumbnails.  But
           * if any other page happens to match host, we'll still allow that
           * other page to launch a popup.
           */
          disallowOthers = true;
          this._logger.debug("_findPageAndShowImage: Disabling Others & Thumbnails since " +
                             ThumbnailZoomPlus.FilterService.pageList[aPage].key +
                             " is disabled");
        }
      }
      
      if ((status == "notTried" || status == "rejectedPageMatchNode") &&
          nodeHost != null && nodeHost != docHost) {
        // The try above failed due to rejecting aDocument as the pageMatchNode.
        // Try again using the thumb itself as pageMatchNode
        status = this._tryImageSource(aDocument, node, nodeHost, aEvent, aPage, node);
        if (status == "launched") {
          return;
        }
      }
    }
    this._debugToConsole("ThumbnailZoomPlus: >>> all pages rejected");

  }
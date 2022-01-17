function(aDocument, aNode, aPage) {
    let result = {imageURL: null, noTooSmallWarning: false, node: aNode};
    let pageInfo = this.pageList[aPage];
    this._logger.debug("getImageSource: page " + aPage + " " + pageInfo.key);

    // Get node name and class
    let imageNode = aNode;
    let nodeName = imageNode.localName.toLowerCase();
    let nodeClass = imageNode.className;
    this._logger.debug("getImageSource: aNode name=" + nodeName + "; src=" +
                       imageNode.getAttribute("src") + "; href=" + imageNode.getAttribute("href") +
                       "; backgroundImage=" + imageNode.style.backgroundImage +
                       "; class=" + nodeClass);
    
    /*
     * Get initial imageSource attempt from imageNode's image or link.
     */
    let imageSource = this._getUrlFromNode(imageNode);
    
    // Call getImageNode if defined.
    if (pageInfo.getImageNode) {
      this._logger.debug("getImageSource: calling getImageNode for " +
                         "aNode=" + aNode + ", nodeName=" + nodeName +
                         ", nodeClass=" + nodeClass + ", imageSource=" + imageSource);
      imageNode = pageInfo.getImageNode(aNode, nodeName, nodeClass, imageSource);      
      if (imageNode != aNode) {
        // changed nodes.   If imageNode == null, we're shouldn't do a popup.
        // and we ignore if localName is null, as sometimes happens if the
        // returned node is the document itself (seen when reloading Google Images)
        if (imageNode != null && imageNode.localName) {
          var nodeName = imageNode.localName;
          let nodeClass = imageNode.className;
          this._logger.debug("getImageSource: after getImageNode, name=" + nodeName + "; src=" +
                           imageNode.getAttribute("src") + "; href=" + imageNode.getAttribute("href") +
                           "; backgroundImage=" + imageNode.style.backgroundImage +
                           "; class=" + nodeClass);
          imageSource = this._getUrlFromNode(imageNode);
        } else {
          imageNode = null;
          imageSource = null; // disable.
          this._logger.debug("getImageSource: after getImageNode, imageNode=null");
        }
      } else {
        this._logger.debug("getImageSource: after getImageNode, unchanged node=" + imageNode);
      }
    }
    
    // Exclude very small embedded-data images, e.g. from google.com search field:
    // data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D
    if (imageSource != null &
        /^data:/.test(imageSource) &&
        imageSource.length < 100) {
      this._logger.debug("getImageSource: ignoring small embedded-data image " +
                         imageSource);
      imageSource = null;
    }
      
    // Don't consider the source of an html doc embedded in an iframe to
    // be a thumbnail (eg gmail compose email body area).
    // Also don't consider a text input field (eg google search)
    // since it's probably just a minor graphic like a shadow.
    if ("html" == nodeName || "frame" == nodeName || "iframe" == nodeName ||
        "embed" == nodeName || "input" == nodeName) {
      this._logger.debug(
            "getImageSource: ignoring due to node type '" + nodeName + "'");
      imageSource = null;
    } 

    if (imageSource != null) {
      imageSource = this._applyBaseURI(aDocument, imageSource);
    }
    
    this._logger.debug("getImageSource: using image source       " + imageSource +
                       "; noTooSmallWarning=" + result.noTooSmallWarning);
    
    result.imageURL = imageSource;
    result.node = imageNode;
    
    return result;
  }
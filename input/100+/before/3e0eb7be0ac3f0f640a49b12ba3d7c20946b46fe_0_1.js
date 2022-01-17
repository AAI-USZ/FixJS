function(aImageSrc, node, flags) {
    let aNodeClass = node.getAttribute("class");
    ThumbnailZoomPlus.Pages._logger.debug("facebook getZoomImage: node=" +
                                          node + "; class=" +
                                          aNodeClass);
    if (aNodeClass == "spotlight") {
      // Disable for lightbox view since popup covers tags in lightbox
      // image and comments, and lightbox image is already pretty large.
      return null;
    }
    if (aNodeClass && aNodeClass.indexOf("actorPic") >= 0) {
      // Don't show popup for small Facebook thumb of the person who's
      // entering a comment since the comment field loses focus and the 
      // thumbnails disappears, which is confusing.
      return null;
    }
    
    // Handle externally-linked images.
    let rexExternal = /.*\/safe_image.php\?(?:.*&)?url=([^&]+).*/;
    if (rexExternal.test(aImageSrc)) {
      let image = aImageSrc.replace(rexExternal, "$1");
      image = decodeURIComponent(image);
      return image;
    }

    let appRex = /.*\/app_full_proxy.php\?.*&src=([^&]+)$/;
    if (appRex.test(aImageSrc)) {
      aImageSrc = aImageSrc.replace(appRex, "$1");
      aImageSrc = decodeURIComponent(aImageSrc);
      return aImageSrc;
    }
    
    // Check the thumbnail against rex1
    let rex1 = new RegExp(/_[qstan]\./);
    let rex2 = new RegExp(/([0-9]\/)[qsta]([0-9])/);
    // Apply replacement for rex1 or rex2; reject if neither matches.
    let image = (rex1.test(aImageSrc) ? aImageSrc.replace(rex1, "_n.") :
                (rex2.test(aImageSrc) ? aImageSrc.replace(rex2, "$1n$2") : null));
    if (image == null) {
      return null;
    }
    if (/_q\./.test(aImageSrc)) {
      // Make sure we avoid positioning our popup will Facebook's wil be.
      flags.popupAvoiderTBEdge = "midpage"; 
      flags.popupAvoiderHeight = 1;
      flags.allowRight = false;
    } else if (/_n\./.test(aImageSrc)) {
      // These thumbs sometimes have a tooltip-like popup showing their
      // profile name above the image.
      flags.allowAbove = false;
    }
    let rex3 = new RegExp(/\/s[0-9]+x[0-9]+\//);
    image = image.replace(rex3, "/");
    return image;
  }
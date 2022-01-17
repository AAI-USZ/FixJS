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
      aImageSrc = aImageSrc.replace(rexExternal, "$1");
      aImageSrc = decodeURIComponent(aImageSrc);
      return aImageSrc;
    }

    let appRex = /.*\/app_full_proxy.php\?.*&src=([^&]+)$/;
    if (appRex.test(aImageSrc)) {
      aImageSrc = aImageSrc.replace(appRex, "$1");
      aImageSrc = decodeURIComponent(aImageSrc);
      return aImageSrc;
    }
    
    aImageSrc = aImageSrc.replace(/_[qstan]\./, "_n.");
    aImageSrc = aImageSrc.replace(/([0-9]\/)[qsta]([0-9])/, "$1n$2");

    // https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash3/c0.0.133.133/p133x133/560586_10150817981981045_883718611_n.jpg becomes
    // https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-ash3/560586_10150817981981045_883718611_n.jpg
    // (handle the c0.0.133.133 part)
    aImageSrc = aImageSrc.replace(/\/c[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+(\/)/i, "/");

    let rex3 = new RegExp(/\/[sp][0-9]+x[0-9]+\//);
    aImageSrc = aImageSrc.replace(rex3, "/");

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

    return aImageSrc;
  }
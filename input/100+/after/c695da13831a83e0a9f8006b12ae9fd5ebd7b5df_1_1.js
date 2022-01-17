function() {

    jQuery("a:has(img[class*=colorbox-]):not(.colorbox-off)").each(function(index, link) {
      //create local copy of Colorbox array so that modifications can be made for every link
      ColorboxLocal = jQuery.extend(true,{},jQueryColorboxSettingsArray);

      //set variables for images
      ColorboxLocal.colorboxMaxWidth = ColorboxLocal.colorboxImageMaxWidth;
      ColorboxLocal.colorboxMaxHeight = ColorboxLocal.colorboxImageMaxHeight;
      ColorboxLocal.colorboxHeight = ColorboxLocal.colorboxImageHeight;
      ColorboxLocal.colorboxWidth = ColorboxLocal.colorboxImageWidth;
      var $linkHref = jQuery(link).attr("href");
      if ($linkHref !== undefined && $linkHref.match(COLORBOX_SUFFIX_PATTERN)) {
        colorboxImage(index, link);
      }
      //else {
        //TODO: does not work, every link from an image will be opened in a colorbox...
        //colorboxLink(index, link,$linkHref)
      //}
    });

    jQuery("a[class*=colorbox-link]").each(function(index, link) {
      //create local copy of Colorbox array so that modifications can be made for every link
      ColorboxLocal = jQuery.extend(true,{},jQueryColorboxSettingsArray);

      var $linkHref = jQuery(link).attr("href");
      if ($linkHref !== undefined) {
        colorboxLink(index, link,$linkHref);
      }
    });
  }
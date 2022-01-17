function(index, link) {
    var $image = jQuery(link).find("img:first");
    //check if the link has a colorbox class
    var $linkClasses = jQuery(link).attr("class");
    if ($linkClasses !== undefined) {
      ColorboxLocal.colorboxGroupId = $linkClasses.match(COLORBOX_CLASS_MATCH) || $linkClasses.match(COLORBOX_MANUAL);
    }
    if (!ColorboxLocal.colorboxGroupId) {
      // link does not have colorbox class. Check if image has colorbox class.
      var $imageClasses = $image.attr("class");
      if ($imageClasses !== undefined && !$imageClasses.match(COLORBOX_OFF)) {
        //groupId is either the automatically created colorbox-123 or the manually added colorbox-manual
        ColorboxLocal.colorboxGroupId = $imageClasses.match(COLORBOX_CLASS_MATCH) || $imageClasses.match(COLORBOX_MANUAL);
      }
      //only call Colorbox if there is a groupId for the image
      if (ColorboxLocal.colorboxGroupId) {
        //convert groupId to string and lose "colorbox-" for easier use
        ColorboxLocal.colorboxGroupId = ColorboxLocal.colorboxGroupId.toString().split('-')[1];

        //if groudId is colorbox-manual, set groupId to "nofollow" so that images are not grouped
        if (ColorboxLocal.colorboxGroupId === "manual") {
          ColorboxLocal.colorboxGroupId = "nofollow";
        }
        //the title of the img is used as the title for the Colorbox.
        var $imageTitle = $image.attr("title");
        if ($imageTitle !== undefined) {
          ColorboxLocal.colorboxTitle = $imageTitle;
        }

        if (jQueryColorboxSettingsArray.addZoomOverlay == "true") {
          colorboxAddZoomOverlayToImages(jQuery(link), $image);
        }

        colorboxWrapper(link);
      }
    }
  }
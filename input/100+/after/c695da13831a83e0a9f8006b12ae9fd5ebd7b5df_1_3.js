function(index, link, $linkHref) {
    //Colorbox links should not be grouped
    ColorboxLocal.colorboxGroupId = "nofollow";

    var $link = jQuery(link);
    //the title of the link is used as the title for the Colorbox
    var $linkTitle = $link.attr("title");
    if ($linkTitle !== undefined) {
      ColorboxLocal.colorboxTitle = $linkTitle;
    }
    else {
      ColorboxLocal.colorboxTitle = '';
    }

    // already checked for ($linkHref !== undefined) before calling this method
    if ($linkHref.match(COLORBOX_SUFFIX_PATTERN)) {
      //link points to an image, set variables accordingly
      ColorboxLocal.colorboxMaxWidth = ColorboxLocal.colorboxImageMaxWidth;
      ColorboxLocal.colorboxMaxHeight = ColorboxLocal.colorboxImageMaxHeight;
      ColorboxLocal.colorboxHeight = ColorboxLocal.colorboxImageHeight;
      ColorboxLocal.colorboxWidth = ColorboxLocal.colorboxImageWidth;
    }
    else {
      //link points to something else, set variables accordingly
      ColorboxLocal.colorboxMaxWidth = false;
      ColorboxLocal.colorboxMaxHeight = false;
      ColorboxLocal.colorboxHeight = ColorboxLocal.colorboxLinkHeight;
      ColorboxLocal.colorboxWidth = ColorboxLocal.colorboxLinkWidth;

      if ($linkHref.match(COLORBOX_INTERNAL_LINK_PATTERN)) {
        //link points to inline content
        ColorboxLocal.colorboxInline = true;
      }
      else {
        //link points to something else, load in iFrame
        ColorboxLocal.colorboxIframe = true;
      }
    }

    colorboxWrapper(link);
  }
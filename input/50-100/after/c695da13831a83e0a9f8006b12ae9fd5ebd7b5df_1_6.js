function(index, link) {
      //create local copy of Colorbox array so that modifications can be made for every link
      ColorboxLocal = jQuery.extend(true,{},jQueryColorboxSettingsArray);

      var $linkHref = jQuery(link).attr("href");
      if ($linkHref !== undefined) {
        colorboxLink(index, link,$linkHref);
      }
    }
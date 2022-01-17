function(className) {
      if(className != showSelector) {
        $("." + className).not("." + showSelector).hide();
      }
    }
function(className) {
      if(className != showSelector) {
        dom.hide("." + className + ":not(." + showSelector + ")");
      }
    }
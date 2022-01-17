function() {
      if (currentPage) {
        currentPage.addClass(siblingNavClass);
        dojo.publish('/window/resize');
      }
    }
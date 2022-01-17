function() {
      if (currentPage) {
        currentPage.removeClass(siblingNavClass);
        dojo.publish('/window/resize');
      }
    }
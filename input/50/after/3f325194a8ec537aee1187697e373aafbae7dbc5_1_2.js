function() {
      dojo.removeClass(dojo.body(), siblingNavOpenClass);
      dojo.publish('/window/resize');
    }
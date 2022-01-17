function() {
      if (lastOpen) {
         $('.Flyout', lastOpen).hide();
         $(lastOpen).removeClass('Open');
      }
   }
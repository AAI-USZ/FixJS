function() {
      if (lastOpen) {
         $('.Flyout', lastOpen).hide();
         $(lastOpen).removeClass('Open').closest('.Item').removeClass('Open');
      }
   }
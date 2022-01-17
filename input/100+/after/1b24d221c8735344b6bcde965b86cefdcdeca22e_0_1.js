function(e) {        
        
      var $flyout = $('.Flyout', this);
        var isHandle = false;
        
        if ($(e.target).closest('.Flyout').length == 0) {
           e.stopPropagation();
           isHandle = true;
        } else if ($(e.target).hasClass('Hijack') || $(e.target).closest('a').hasClass('Hijack')) {
           return;
        }
        e.stopPropagation();
      
      // Dynamically fill the flyout.
      var rel = $(this).attr('rel');
      if (rel) {
         $(this).attr('rel', '');
         $flyout.addClass('Progress');
         $.ajax({
            url: gdn.url(rel),
            data: {DeliveryType: 'VIEW'},
            success: function(data) {
               $flyout.html(data);
            },
            complete: function() {
               $flyout.removeClass('Progress');
            }
         });
      }
      
      if ($flyout.css('display') == 'none') {
         if (lastOpen != null) {
            $('.Flyout', lastOpen).hide();
            $(lastOpen).removeClass('Open').closest('.Item').removeClass('Open');
         }
        
         $(this).addClass('Open').closest('.Item').addClass('Open');
         $flyout.show();
         lastOpen = this;
      } else {
         $flyout.hide();
         $(this).removeClass('Open').closest('.Item').removeClass('Open');
      }
     
        if (isHandle)
           return false;
   }
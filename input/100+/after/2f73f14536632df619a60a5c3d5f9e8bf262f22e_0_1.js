function(index) {
        $(this).wrap('<div class="gsWrapper">');
        gsWrapper = $(this).parent();
        gsWrapper.css({
          'position' : 'relative',
          'display' : 'inline-block'
        });
        if (window.location.hostname !== this.src.split('/')[2]) {
          // If the image is on a different domain proxy the request
         $.getImageData({
            url: $(this).attr('src'),
            server: $options.server,
            success: $.proxy(function(image) {
                can = $.fn.greyScale.returnCanvas(image, image.width, image.height);
                if ($options.reverse) { can.appendTo(gsWrapper).css({"display" : "block", "opacity" : "0"}); }
                else { can.appendTo(gsWrapper).fadeIn($options.fadeTime); }
              }, gsWrapper),
            error: function(xhr, text_status){
              // silently fail on error
            }
          });
        } else { // If the image is on the same domain don't proxy the request
          can = $.fn.greyScale.returnCanvas($(this)[0], $(this).width(), $(this).height());
          if ($options.reverse) { can.appendTo(gsWrapper).css({"display" : "block", "opacity" : "0"}); }
          else { can.appendTo(gsWrapper).fadeIn($options.fadeTime); }
        }
    }
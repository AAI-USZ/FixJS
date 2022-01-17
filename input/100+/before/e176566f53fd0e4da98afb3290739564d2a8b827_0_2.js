function(args) {
    $options = $.extend({
      hover: true,
      fadeTime: $.fx.speeds._default,
      reverse: false,
      server: "http://img-to-json.appspot.com/"
    }, args);
    if ($.browser.msie) {
      // IE doesn't support Canvas so use it's horrible filter syntax instead
      this.each(function(){
        var greyscale = $options.reverse ? 0 : 1;
        $(this).css({
          'filter': 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=' + greyscale + ')',
          'zoom': '1'
        }).addClass('.gsFilter');
        if ($options.hover) {
          $(this).hover(function() {
            var greyscale = $options.reverse ? 1 : 0;
            $(this).css({
              'filter': 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=' + greyscale + ')'
            });
          }, function() {
            var greyscale = $options.reverse ? 0 : 1;
            $(this).css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=' + greyscale + ')');
          });
        }
      });
    } else if (!!document.createElement('canvas').getContext) {
      this.each(function(index) {
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
    });
    if ($options.hover) {
      $(this).parent().delegate('.gsCanvas', 'mouseover mouseout', function(event) {
        over = $options.reverse ? 1 : 0;
        out = $options.reverse ? 0 : 1;
        (event.type == 'mouseover') && $(this).stop().animate({'opacity': over}, $options.fadeTime);
        (event.type == 'mouseout') && $(this).stop().animate({'opacity': out}, $options.fadeTime); 
      });
    }
  } else {
    // do nothing no way of greyscaling
  }
  }
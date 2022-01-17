function(image) {
                can = $.fn.greyScale.returnCanvas(image, image.width, image.height);
                if ($options.reverse) { can.appendTo(gsWrapper).css({"display" : "block", "opacity" : "0"}); }
                else { can.appendTo(gsWrapper).fadeIn($options.fadeTime); }
              }
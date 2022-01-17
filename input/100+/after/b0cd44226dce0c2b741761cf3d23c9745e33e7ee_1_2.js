function() {
                // calculate image cover sizes
                  var adjusted_size = size_image_to_screen(first_img.width,first_img.height,$list);
                // set up slides
                  $list.find('li').each(function(i,n) {
                    $(n).find('img').css({
                      'width':adjusted_size.x,
                      'height':'auto',
                    });
                    offset = crop_image_to_screen(adjusted_size, $list);
                    var side = offset.side;
                    $(n).css({ 
                        'margin' : 0,
                        'padding' : 0,
                        'position' : 'absolute',
                        'top' : '0px',
                        'z-index' : z_index,
                      }).css(offset.side, offset.amount)
                      .addClass('blurryTransition_frame')
                      .find('img').attr('id', 'blurryTransition_canvas_'+i);
                    z_index++;
                  });
                // set up first canvas
                  $canvas = $('<canvas/>');
                  $canvas.attr({
                    id : 'blurryTransition_canvas_c1',
                    class : 'blurryTransition_canvas',
                    width : first_img.width,
                    height : first_img.height
                  }).css({
                    'width' : adjusted_size.x + 'px !important',
                    'height' : adjusted_size.y + 'px !important',
                    '-webkit-transition-property' : 'opacity',
                    '-webkit-transition-duration' : (properties.css_transition_speed * 0.8) + 's',
                    '-webkit-transition-timing-function' : 'ease-out',
                    'z-index' : z_index,
                    'position' : 'absolute',
                    'opacity' : 0,
                  }).css(offset.side, offset.amount);
                  $list.before($canvas);
                // set up second canvas, higher Z and runs a skosh slower
                  $canvas_2 = $canvas.clone();
                  $canvas_2.attr({
                    id : 'blurryTransition_canvas_c2',
                  }).css({
                    'z-index' : z_index + 1,
                    '-webkit-transition-duration' : (properties.css_transition_speed) + 's',
                  });
                  $list.before($canvas_2);
                
              }
function(i,n) {
                    $(n).find('img').css({
                      'width':adjusted_size.x,
                      'height':'auto',
                    });
                    offset = crop_image_to_screen(adjusted_size, $list);
                    var side = offset.side;
                    $(n).css(offset.side, offset.amount)
                      .css({ 
                        'margin' : 0,
                        'padding' : 0,
                        'position' : 'absolute',
                        'top' : '0px',
                        'z-index' : z_index,
                      })
                      .addClass('blurryTransition_frame')
                      .find('img').attr('id', 'blurryTransition_canvas_'+i);
                    z_index++;
                  }
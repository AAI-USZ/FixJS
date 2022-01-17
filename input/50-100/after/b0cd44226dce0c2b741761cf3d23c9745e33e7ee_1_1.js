function() {
              $('#blurryTransition_canvas_c2').unbind();
              // unhide the new image
              $list.find('li:nth-child('+(destination_frame+1)+')').css('opacity', 1);
    					// and finally fade out the new blurred image canvas
    					$('#blurryTransition_canvas_c2').css('opacity', 0);
              cycle_index = destination_frame;
            }
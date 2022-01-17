function() {
            // hide the current image
            $list.find('li:nth-child('+(cycle_index+1)+')').css('opacity', 0);
            // simultaneously fade out that blurred canvas…
            $('#blurryTransition_canvas_c1').unbind().css('opacity', 0);
            // … and fade in the new blurred image canvas
            $('#blurryTransition_canvas_c2').removeClass('slow').bind('webkitTransitionEnd oTransitionEnd transitionend MSTransitionEnd transitionend MSTransitionEnd', function() {
              $('#blurryTransition_canvas_c2').unbind();
              // unhide the new image
              $list.find('li:nth-child('+(destination_frame+1)+')').css('opacity', 1);
    					// and finally fade out the new blurred image canvas
    					$('#blurryTransition_canvas_c2').addClass('slow').css('opacity', 0);
              cycle_index = destination_frame;
            }).css('opacity', 1);
          }
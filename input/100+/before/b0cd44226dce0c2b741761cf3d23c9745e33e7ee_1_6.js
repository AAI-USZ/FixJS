function(arguments) {

    var properties = $.extend({
      'interval' : 12000,
      'css_transition_speed' : '0.7s',
      'width' : null,
      'height' : null
    }, arguments);

    return this.each(function() {

      var $list = '',
        $canvas = '',
        z_index = 100,
        first_img = null,
        offset = {},
        cycle_index = 0,
        cycle = null;
      
      var methods = {
        init : function(options) {
          return $(this).each(function() {
            $list = $(this);
            if (options) $.extend(properties, options);
            // if width and height not specified, attempt to get dimensions
              if( properties.width == null) properties.width = $list.width();
              if( properties.height == null) properties.height = $list.height();
              $list.css({
                width : properties.width,
                height : properties.height,
              });
            // create list wrapper
              $list.wrap('<div class="blurryTransition_wrapper"/>');
              $('.blurryTransition_wrapper').css({
                width: properties.width,
                height: properties.height,
                display: $list.css('display'),
                overflow: 'hidden',
                position: $list.css('position'),
              });
              $list.css({
                position : 'relative',
              });
            // hide all images except first one
              $list.find('li').not('li:first-child').css('opacity', 0);
            // retrieve image dimensions to set up canvases
              var $img = $list.find('li:first-child img');
              first_img = new Image();
              first_img.onload = function() {
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
                    '-webkit-transition-duration' : properties.css_transition_speed,
                    '-webkit-transition-timing-function' : 'ease-out',
                    'z-index' : z_index,
                    'position' : 'absolute',
                    'opacity' : 0,
                  }).css(offset.side, offset.amount);
                  $list.before($canvas);
                // set up second canvas
                  $canvas_2 = $canvas.clone();
                  $canvas_2.attr({
                    id : 'blurryTransition_canvas_c2',
                  }).css({
                    'z-index' : z_index + 1,
                  });
                  $list.before($canvas_2);
                
              }
              first_img.src = $img.attr('src');
              methods.bind_window_resize();
              methods.startCycle();
            });
          // done setting up canvases
        },
        bind_window_resize : function() {
        	$(window).resize(function(){
            // calculate image cover sizes
              var adjusted_size = size_image_to_screen(first_img.width,first_img.height,$list);
              offset = crop_image_to_screen(adjusted_size, $list);
            // adjust slides
              $list.find('li').each(function(i,n) {
                $(n).find('img').css({
                  'width':adjusted_size.x,
                  'height':'auto',
                });
                $(n).css(offset.side, offset.amount);
              });
            // adjust canvas
              $('.blurryTransition_canvas').css({
                'width' : adjusted_size.x + 'px !important',
                'height' : adjusted_size.y + 'px !important',
              }).css(offset.side, offset.amount);
        	});
        },
        startCycle : function() {
          cycle = setInterval(function() {
            methods.shiftImage();
          }, properties.interval);
        },
        stopCycle : function() {
          clearInterval(cycle);
        },
        shiftImage : function() {
          next_i = cycle_index+1;
          if(next_i >= $list.find('li').length) next_i = 0;
          methods.shiftImageTo(next_i);
        },
        shiftImageTo : function(destination_frame) {
          // note: confusing? i+1 because CSS indexes from 1, not 0
    			// prepare blurred image canvases
      			stackBlurImage( 'blurryTransition_canvas_'+cycle_index, 'blurryTransition_canvas_c1', 40, false );
            if(destination_frame > $list.find('li').length) b = 0;
      			stackBlurImage( 'blurryTransition_canvas_'+destination_frame, 'blurryTransition_canvas_c2', 40, false );
          // "blur" the current image (fade in its blurred canvas)
          $('#blurryTransition_canvas_c1').removeClass('fast').bind('webkitTransitionEnd oTransitionEnd transitionend MSTransitionEnd transitionend MSTransitionEnd', function() {
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
          }).css('opacity', 1);
// todo: optional simualtenous mode?
        }
      };
  
      return methods.init.apply(this);

    });

  }
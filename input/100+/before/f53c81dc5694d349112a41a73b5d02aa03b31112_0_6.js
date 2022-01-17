function(i) {
					var $this = $(this);

					$this.css('height', $this.find('li:first img').height() )
						 .after('<div class="image-gallery-slider-nav"> <a class="prev image-gallery-slider-nav-prev-' + i + '">Prev</a> <a class="next image-gallery-slider-nav-next-' + i + '">Next</a> </div>')
						 .cycle({
							 before: function(curr, next, opts) {
								 var $this = $(this);
								 // set the container's height to that of the current slide
								 $this.parent().stop().animate({ height: $this.height() }, opts.speed);
								 // remove temporary styles, if they exist
								 $('.ss-temp-slider-styles').remove();
							 },
							 containerResize : false,
							 easing          : 'easeInOutExpo',
							 fx              : 'fixedScrollHorz',
							 fit             : true,
							 next            : '.image-gallery-slider-nav-next-' + i,
							 pause           : true,
							 prev            : '.image-gallery-slider-nav-prev-' + i,
							 slideExpr       : 'li',
							 slideResize     : true,
							 speed           : 600,
							 timeout         : 0,
							 width           : '100%'
						 });
					
				}
function(curr, next, opts) {
								 var $this = $(this);
								 // set the container's height to that of the current slide
								 $this.parent().stop().animate({ height: $this.height() }, opts.speed);
								 // remove temporary styles, if they exist
								 $('.ss-temp-slider-styles').remove();
							 }
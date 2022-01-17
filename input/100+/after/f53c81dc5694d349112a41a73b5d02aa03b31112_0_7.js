function() {
				
				$slider.each(function(i) {
					var $this = $(this);

					$this.css('height', $this.children('li:first').height() )
						 .after('<div class="image-gallery-slider-nav"> <a class="prev image-gallery-slider-nav-prev-' + i + '">Prev</a> <a class="next image-gallery-slider-nav-next-' + i + '">Next</a> </div>')
						 .cycle({
							 before: function(curr, next, opts) {
								 var $this = $(this);
								 // set the container's height to that of the current slide
								 $this.parent().stop().animate({ height: $this.height() }, opts.speed);
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
						 })
						 .data( 'slideCount', $slider.children('li').length );
					
				});
			
				// Position nav
				var $arrowNav = $('.image-gallery-slider-nav a');
				$arrowNav.css('margin-top', - $arrowNav.height() / 2 );

				// Pause on nav hover
				$('.image-gallery-slider-nav a').on('mouseenter', function() {
					$(this).parent().prev().cycle('pause');
				}).on('mouseleave', function() {
					$(this).parent().prev().cycle('resume');
				})

				// Hide navigation if only a single slide
				if( $slider.data('slideCount') <= 1 )
					$slider.next('.image-gallery-slider-nav').hide();
				
			}
function() {

		var $slider = $('#logos-slider');

		if( $slider.length ) {

			$('#logos-slider').smartStartSlider({
				pos             : 0, 
				hideContent     : true,
				contentPosition : 'center',
				timeout         : 3000,
				pause           : false,
				pauseOnHover    : true,
				type            : {
					mode        : 'random',
					speed       : 400,
					easing      : 'easeInOutExpo',
					seqfactor   : 100
				}
			});

			// Detect swipe gestures support
			if( Modernizr.touch ) {
				
				function swipeFunc( e, dir ) {
				
					var $slider = $(e.currentTarget);
					
					if( dir === 'left' ) {
						$slider.find('.pagination-container .next').trigger('click');
					}
					
					if( dir === 'right' ) {
						$slider.find('.pagination-container .prev').trigger('click');
					}
					
				}
				
				$slider.swipe({
					swipeLeft       : swipeFunc,
					swipeRight      : swipeFunc,
					allowPageScroll : 'auto'
				});
				
			}

		}
		
	}
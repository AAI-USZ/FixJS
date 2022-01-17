function() {

		var $carousel = $('.projects-carousel, .post-carousel');

		if( $carousel.length ) {

			var scrollCount;

			if( $(window).width() < 480 ) {
				scrollCount = 1;
			} else if( $(window).width() < 768 ) {
				scrollCount = 2;
			} else if( $(window).width() < 960 ) {
				scrollCount = 3;
			} else {
				scrollCount = 4;
			}

			$carousel.jcarousel({
				animation : 600,
				easing    : 'easeOutCubic',
				scroll    : scrollCount
			});

			// Detect swipe gestures support
			if( Modernizr.touch ) {
				
				function swipeFunc( e, dir ) {
				
					var $carousel = $(e.currentTarget);
					
					if( dir === 'left' ) {
						$carousel.parent('.jcarousel-clip').siblings('.jcarousel-next').trigger('click');
					}
					
					if( dir === 'right' ) {
						$carousel.parent('.jcarousel-clip').siblings('.jcarousel-prev').trigger('click');
					}
					
				}
			
				$carousel.swipe({
					swipeLeft       : swipeFunc,
					swipeRight      : swipeFunc,
					allowPageScroll : 'auto'
				});
				
			}

		}

	}
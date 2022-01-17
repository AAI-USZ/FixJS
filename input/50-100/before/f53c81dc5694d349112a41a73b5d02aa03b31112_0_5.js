function swipeFunc( e, dir ) {
				
					var $carousel = $(e.currentTarget);
					
					if( dir === 'left' ) {
						$carousel.parent('.jcarousel-clip').siblings('.jcarousel-next').trigger('click');
					}
					
					if( dir === 'right' ) {
						$carousel.parent('.jcarousel-clip').siblings('.jcarousel-prev').trigger('click');
					}
					
				}
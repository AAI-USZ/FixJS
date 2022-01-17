function swipeFunc( e, dir ) {
				
					var $slider = $( e.currentTarget );

					// Enable swipes if more than one slide
					if( $slider.data('slideCount') > 1 ) {
											
						$slider.data('dir', '');
						
						if( dir === 'left' )
							$slider.cycle('next');
						
						if( dir === 'right' ) {
							$slider.data('dir', 'prev')
							$slider.cycle('prev');
						}

					}
					
				}
function swipeFunc( e, dir ) {
				
					var $slider = $(e.currentTarget);
					
					if( dir === 'left' )
						$slider.find('.pagination-container .next').trigger('click');
					
					if( dir === 'right' )
						$slider.find('.pagination-container .prev').trigger('click');
					
				}
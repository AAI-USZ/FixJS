function(){
					// The final resize (on finish)
					// Remove scrollbars so we can take propper measurements
					$($.Scroll).addClass('mc-hide-scrolls');
					
					// Cache our window's new dimensions
					$.Window
						.data('h',$(window).height())
						.data('w',$(window).width());
					
					// Set the container's height and width
					$self.height($.Window.data('h')).width($.Window.data('w'))
					
					// Set slide's height and width to match the window size
					$self.find('.mc-image').each(function(n){
						Old.maximage(n);
					});
					
					// Put the scrollbars back to how they were
					$($.Scroll).removeClass('mc-hide-scrolls');
				}
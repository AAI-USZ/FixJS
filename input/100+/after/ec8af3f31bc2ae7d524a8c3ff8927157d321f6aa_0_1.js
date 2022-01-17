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
					
					// Update cycle's ideas of what our slide's height and width should be
					var curr_opts = $self.data('cycle.opts');
					curr_opts.height = $.Window.data('h');
					curr_opts.width = $.Window.data('w');
					jQuery.each(curr_opts.elements, function(index, item) {
					    item.cycleW = $.Window.data('w');
						item.cycleH = $.Window.data('h');
					})
					
					// Put the scrollbars back to how they were
					$($.Scroll).removeClass('mc-hide-scrolls');
				}
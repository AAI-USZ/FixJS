function _construct() {
				// Reset some styles
				li.css({ 'width' : 'auto' });
				
				// Grabbing widths and doing some math
				var ul_width = trueInnerWidth(ul),
					ul_width_outer = ul.outerWidth(true),
					ul_width_extra = ul_width_outer - ul_width,
					
					full_width = trueInnerWidth(ul_wrap),
					extra_width = (full_width - ul_width_extra) - ul_width,
					li_padding = Math.floor( extra_width / li_count );
				
				// Cycle through the list items and give them widths
				li.each(function() {
					var li_width = trueInnerWidth( $(this) );
					$(this).css({ 'width' : (li_width + li_padding) });
				});
				
				// Get the leftover pixels after we set every itms width
				// and add the leftovers to the last navigation item
				var li_last_width = trueInnerWidth(li_last) + ( (full_width - ul_width_extra) - trueInnerWidth(ul) );
				li_last.css({ 'width' : li_last_width });
			}
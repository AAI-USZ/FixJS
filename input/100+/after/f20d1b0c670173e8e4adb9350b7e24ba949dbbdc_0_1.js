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
				li.each(function(index) {
					var li_width = trueInnerWidth( $(this) );
					$(this).css({ 'width' : (li_width + li_padding) + 'px' });
				});
				
				// Get the leftover pixels after we set every itms width
				var li_last_width = trueInnerWidth(li_last) + ( (full_width - ul_width_extra) - trueInnerWidth(ul) );
				// I hate to do this but for some reason Firefox (v13.0) and IE are always
				// one pixel off when rendering. So this is a quick fix for that.
				if ($.browser.mozilla || $.browser.msie) {
					li_last_width = li_last_width - 1;
				}
				// Add the leftovers to the last navigation item
				li_last.css({ 'width' : li_last_width + 'px' });
			}
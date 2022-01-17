function _construct() {
			
				if (o.tableDisplay || ($.browser.msie && parseInt($.browser.version, 10) <= 7)) {
					
					// IE7 doesn't support the "display: table" method
					// so we need to do it the hard way.
					
					// Add some styles
					ul.css({ 'float' : 'left' });
					li.css({ 'float' : 'left', 'width' : 'auto' });
					li_a.css({ 'padding-left' : 0, 'padding-right' : 0 });
					
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
				
				} else {
					// Every modern browser supports the "display: table" method
					// so this is the best way to do it for them.
					ul.css({ 'display' : 'table', 'float' : 'none', 'width' : '100%' });
					li.css({ 'display' : 'table-cell', 'float' : 'none' });
				}
			}
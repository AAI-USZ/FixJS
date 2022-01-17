function(){
			var css = {}, widget = $(this).closest('div.widget'), inside = widget.children('.widget-inside'), w = parseInt( widget.find('input.widget-width').val(), 10 );

			if ( inside.is(':hidden') ) {
				if ( w > 250 && inside.closest('div.widgets-sortables').length ) {
					css['width'] = w + 30 + 'px';
					if ( inside.closest('div.widget-liquid-right').length )
						css[margin] = 235 - w + 'px';
					widget.css(css);
				}
				wpWidgets.fixLabels(widget);
				inside.slideDown('fast');
			} else {
				inside.slideUp('fast', function() {
					widget.css({'width':'', margin:''});
				});
			}
			return false;
		}
function(e){
			var target = $(e.target), css = {}, widget, inside, w;

			if ( target.parents('.widget-top').length && ! target.parents('#available-widgets').length ) {
				widget = target.closest('div.widget');
				inside = widget.children('.widget-inside');
				w = parseInt( widget.find('input.widget-width').val(), 10 );

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
				e.preventDefault();
			} else if ( target.hasClass('widget-control-save') ) {
				wpWidgets.save( target.closest('div.widget'), 0, 1, 0 );
				e.preventDefault();
			} else if ( target.hasClass('widget-control-remove') ) {
				wpWidgets.save( target.closest('div.widget'), 1, 1, 0 );
				e.preventDefault();
			} else if ( target.hasClass('widget-control-close') ) {
				wpWidgets.close( target.closest('div.widget') );
				e.preventDefault();
			}
		}
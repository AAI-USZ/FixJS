function() {
			var div = jQuery( '<div>' ),
			    span = jQuery( '<span>' ),
			    el,
			    obj = this.obj;

			if ( GENTICS.Utils.Dom.allowsNesting( obj[0], div[0] ) ) {
				el = div;
			} else {
				el = span;
			}
			if (jQuery( "." + this.placeholderClass, obj).length !== 0) {
				return;
			}
			jQuery( obj ).append( el.addClass( this.placeholderClass ) );
			jQuery.each(
				Aloha.settings.placeholder,
				function( selector, selectorConfig ) {
					if ( obj.is( selector ) ) {
						el.html( selectorConfig );
					}
				}
			);

			// remove browser br
			jQuery( 'br', obj ).remove();

			// delete div, span, el;
		}
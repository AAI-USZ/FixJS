function getHiddenProperty(item, property) {
				// Default method
				if (!property) property = 'height';

				// Check if item was hidden
				if ( $(this).is(':hidden') ) {
					// Reveal the hidden item but not to the user
					item.show().css({'position':'absolute', 'visibility':'hidden', 'display':'block'});
				}

				// Get the requested property
				value = item[property]();

				// Check if item was hidden
				if ( $(this).is(':hidden') ) {
					// Return the originally hidden item to it's original state
					item.hide().css({'position':'static', 'visibility':'visible', 'display':'none'});
				}
				// Return the height
				return value;
			}
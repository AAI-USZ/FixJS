function( event, ui ) {
					// back compat for _renderItem using item.autocomplete
					var item = ui.item.data( "ui-autocomplete-item" ) || ui.item.data( "item.autocomplete" );
					if ( false !== self._trigger( "focus", event, { item: item } ) ) {
						// use value to match what will end up in the input, if it was a key event
						if ( /^key/.test(event.originalEvent.type) ) {
							self._value( item.value );
						}
					}
				}
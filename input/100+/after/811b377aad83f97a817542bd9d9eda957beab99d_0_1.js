function( event, ui ) {
					// back compat for _renderItem using item.autocomplete
					var item = ui.item.data( "ui-autocomplete-item" ) || ui.item.data( "item.autocomplete" );
						previous = self.previous;

					// only trigger when focus was lost (click on menu)
					if ( self.element[0] !== self.document[0].activeElement ) {
						self.element.focus();
						self.previous = previous;
						// #6109 - IE triggers two focus events and the second
						// is asynchronous, so we need to reset the previous
						// term synchronously and asynchronously :-(
						setTimeout(function() {
							self.previous = previous;
							self.selectedItem = item;
						}, 1);
					}

					if ( false !== self._trigger( "select", event, { item: item } ) ) {
						self._value( item.value );
					}
					// reset the term after the select event
					// this allows custom select handling to work properly
					self.term = self._value();

					self.close( event );
					self.selectedItem = item;
				}
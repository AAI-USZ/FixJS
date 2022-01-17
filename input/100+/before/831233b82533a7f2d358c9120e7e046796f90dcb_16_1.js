function( event, rangeObject ) {
				var config,
				    foundMarkup;

				if ( Aloha.activeEditable ) {
					// show/hide the button according to the configuration
					config = that.getEditableConfig( Aloha.activeEditable.obj );
					if ( jQuery.inArray( 'span', config ) !== -1 ) {
						addMarkupToSelectionButton.setPressed( false );
					} else {
						addMarkupToSelectionButton.setPressed( true );

						// leave if a is not allowed
						return;
					}

					foundMarkup = that.findLangMarkup( rangeObject );
					if ( foundMarkup ) {
						addMarkupToSelectionButton.setPressed( true );
						FloatingMenu.setScope( 'wai-lang' );
						langField.setTargetObject( foundMarkup, 'lang' );
					} else {
						langField.setTargetObject( null );
					}
				}
			}
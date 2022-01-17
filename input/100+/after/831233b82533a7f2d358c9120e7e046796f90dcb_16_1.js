function( event, rangeObject ) {
				var foundMarkup;

				foundMarkup = that.findLangMarkup( rangeObject );
				if ( foundMarkup ) {
					addMarkupToSelectionButton.setPressed( true );
					FloatingMenu.setScope( 'wai-lang' );
					langField.setTargetObject( foundMarkup, 'lang' );
				} else {
					langField.setTargetObject( null );
				}
			}
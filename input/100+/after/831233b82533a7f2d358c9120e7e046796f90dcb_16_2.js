function() {
			var that = this;

			// add the event handler for selection change
			Aloha.bind( 'aloha-editable-activated', function( event, rangeObject ) {
				var config;
				// show/hide the button according to the configuration
				config = that.getEditableConfig( Aloha.activeEditable.obj );
				if ( jQuery.inArray( 'span', config ) !== -1 ) {
					addMarkupToSelectionButton.show();
				} else {
					addMarkupToSelectionButton.hide();
					return;
				}
			} );

			// add the event handler for selection change
			Aloha.bind( 'aloha-selection-changed', function( event, rangeObject ) {
				var foundMarkup;

				foundMarkup = that.findLangMarkup( rangeObject );
				if ( foundMarkup ) {
					addMarkupToSelectionButton.setPressed( true );
					FloatingMenu.setScope( 'wai-lang' );
					langField.setTargetObject( foundMarkup, 'lang' );
				} else {
					langField.setTargetObject( null );
				}
			} );
		}
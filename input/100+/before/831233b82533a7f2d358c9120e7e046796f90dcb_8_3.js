function () {
			var that = this;

			// add the event handler for creation of editables
			Aloha.bind( 'aloha-editable-created', function ( event, editable ) {
				// CTRL+L
				editable.obj.keydown( function ( e ) {
					if ( e.metaKey && e.which == 76 ) {
						if ( that.findLinkMarkup() ) {
							// open the tab containing the href
							FloatingMenu.activateTabOfButton( 'href' );
							that.hrefField.focus();
						} else {
							that.insertLink();
						}
						// prevent from further handling
						// on a MAC Safari cursor would jump to location bar. Use ESC then META+L
						return false;
					}
				} );

				editable.obj.find( 'a' ).each( function ( i ) {
					that.addLinkEventHandlers( this );
				} );
			} );

			// add the event handler for selection change
			Aloha.bind( 'aloha-selection-changed', function ( event, rangeObject ) {
				var config,
				    foundMarkup;
				
				// Check if we need to ignore this selection changed event for
				// now and check whether the selection was placed within a
				// editable area.
				if ( !that.ignoreNextSelectionChangedEvent &&
						Aloha.Selection.isSelectionEditable() &&
							Aloha.activeEditable != null ) {
					// show/hide the button according to the configuration
					config = that.getEditableConfig( Aloha.activeEditable.obj );
					if ( jQuery.inArray( 'a', config ) != -1 ) {
						that.formatLinkButton.show();
						that.insertLinkButton.show();
					} else {
						that.formatLinkButton.hide();
						that.insertLinkButton.hide();
						// leave if a is not allowed
						return;
					}
					
					foundMarkup = that.findLinkMarkup( rangeObject );
					
					if ( foundMarkup ) {
						that.toggleLinkScope( true );
						
						// remember the current tab selected by the user
						var currentTab = FloatingMenu.userActivatedTab;

						// switch to the href tab (so that we make sure that the href field gets created)
						FloatingMenu.activateTabOfButton( 'href' );
						if ( currentTab ) {
							// switch back to the original tab
							FloatingMenu.userActivatedTab = currentTab;
						}
						// now we are ready to set the target object
						that.hrefField.setTargetObject( foundMarkup, 'href' );
						
						// if the selection-changed event was raised by the first click interaction on this page
						// the hrefField component might not be initialized. When the user switches to the link
						// tab to edit the link the field would be empty. We check for that situation and add a
						// special interval check to set the value once again
						if ( jQuery( '#' + that.hrefField.extButton.id ).length == 0 ) {
							// there must only be one update interval running at the same time
							if ( that.hrefUpdateInt !== null ) {
								clearInterval( that.hrefUpdateInt );
							}
							
							// register a timeout that will set the value as soon as the href field was initialized
							that.hrefUpdateInt = setInterval( function () {
								if ( jQuery( '#' + that.hrefField.extButton.id ).length > 0 ) { // the object was finally created
									that.hrefField.setTargetObject( foundMarkup, 'href' );
									clearInterval( that.hrefUpdateInt );
								}
							}, 200 );
						}
						Aloha.trigger( 'aloha-link-selected' );
					} else {
						that.toggleLinkScope( false );
						that.hrefField.setTargetObject( null );
						Aloha.trigger( 'aloha-link-unselected' );
					}
				}
				
				that.ignoreNextSelectionChangedEvent = false;
			} );
		}
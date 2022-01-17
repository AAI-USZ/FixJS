function ( event, editable ) {
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
			}
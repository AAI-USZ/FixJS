function() {
			var embedPlayer = this.embedPlayer;
			var loc = embedPlayer.$interface.find( '.rButton.timed-text' ).offset();
			mw.log('showTextInterface::' + embedPlayer.id + ' location: ', loc);
			// TODO: Fix menu animation
			var $menu = $( '#textMenuContainer_' + embedPlayer.id );
			if ( $menu.length ) {
				// Hide show the menu:
				if( $menu.is( ':visible' ) ) {
					$menu.hide().parent().hide(); // Hide menu and parent container
				}else{
					$menu.show().parent().show(); // Show menu and parent container
				}
			}else{
				// Bind the text menu:
				this.buildMenu( true );
			}
		}
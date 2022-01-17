function() {
			var embedPlayer = this.embedPlayer;
			var loc = embedPlayer.$interface.find( '.rButton.timed-text' ).offset();
			mw.log('TimedText::showTextMenu:: ' + embedPlayer.id + ' location: ', loc);
			// TODO: Fix menu animation
			var $menuButton = this.embedPlayer.$interface.find( '.timed-text' );
			// Check if a menu has already been built out for the menu button: 
			if ( $menuButton[0].m ) {
				$menuButton.menu('show');
			} else {
				// Bind the text menu:
				this.buildMenu( true );
			}
		}
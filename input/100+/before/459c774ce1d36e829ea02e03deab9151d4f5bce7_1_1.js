function( targetElement, playerInterface ) {
		mw.log( 'processEmbedPlayers::swapEmbedPlayerElement: ' + targetElement.id );
		// Create a new element to swap the player interface into
		var swapPlayerElement = document.createElement('div');

		// Add a class that identifies all embedPlayers:
		$( swapPlayerElement ).addClass( 'mwEmbedPlayer' );

		// Get properties / methods from playerInterface:
		for ( var method in playerInterface ) {
			if ( method != 'readyState' ) { // readyState crashes IE ( don't include )
				swapPlayerElement[ method ] = playerInterface[ method ];
			}
		}
		// copy over css text:
		swapPlayerElement.style.cssText =targetElement.style.cssText;


		// Copy any data attributes from the target player element over to the swapPlayerElement
		var dataAttributes = mw.getConfig("EmbedPlayer.DataAttributes");
		if( dataAttributes ){
			$.each( dataAttributes, function( attrName, na ){
				if( $( targetElement ).data( attrName ) ){
					$( swapPlayerElement ).data( attrName, $( targetElement ).data( attrName ) );
				}
			});
		}
		// Check for Persistent native player ( should keep the video embed around )
		if(  playerInterface.isPersistentNativePlayer()
				||
			// Also check for native controls on a video or audio tag
			( playerInterface.useNativePlayerControls()
					&&
				( targetElement.nodeName == 'video' || targetElement.nodeName == 'audio' )
			)
		) {

			$( targetElement )
			.attr( 'id', playerInterface.pid )
			.addClass( 'nativeEmbedPlayerPid' )
			.show()
			.after(
				$( swapPlayerElement ).css( 'display', 'none' )
			);

		} else {
			$( targetElement ).replaceWith( swapPlayerElement );
		}

		// If we don't already have a loadSpiner add one:
		if( $('#loadingSpinner_' + playerInterface.id ).length == 0 && !$.browser.mozilla ){
			if( playerInterface.useNativePlayerControls() || playerInterface.isPersistentNativePlayer() ) {
				var $spinner = $( targetElement )
					.getAbsoluteOverlaySpinner();
			}else{
				var $spinner = $( swapPlayerElement ).getAbsoluteOverlaySpinner();
			}
			$spinner.attr('id', 'loadingSpinner_' + playerInterface.id );
		}
		return swapPlayerElement;
	}
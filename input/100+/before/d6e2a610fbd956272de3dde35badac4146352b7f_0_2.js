function() {
		var _this = this;
		mw.log("PlayerControlBuilder :: restoreWindowPlayer" );
		var embedPlayer = this.embedPlayer;
		embedPlayer.$interface.css({'position':'relative'});

		// Check if fullscreen mode is already restored: 
		if( this.inFullScreen === false ){
			return ;
		}
		// Set fullscreen mode to false
		this.inFullScreen = false;

		// Check for native support for fullscreen and support native fullscreen restore
		if ( window.fullScreenApi.supportsFullScreen && mw.getConfig('EmbedPlayer.IsIframeServer' ) ) {
			var parentWindow = window.parent; 
			var parentTarget = parentWindow.document.getElementById( this.embedPlayer.id );
			parentWindow.fullScreenApi.cancelFullScreen( parentTarget );
		}

		// always remove fullscreen overlay if present: 
		$('.mw-fullscreen-overlay').remove();
		
		// Check if iFrame mode ( fullscreen is handled by the iframe parent dom )
		if( !mw.getConfig('EmbedPlayer.IsIframeServer' ) ){
			this.restoreWindowPlayerDom();
		} else {
			// if an iframe server make sure the player size is in sync with the iframe window size: 
			// ( iPad sometimes does not fire resize events ) 
			if( this.isWindowSizePlayer ){
				setTimeout( function(){_this.syncPlayerSize()}, 50);
				setTimeout( function(){_this.syncPlayerSize()}, 200);
			}
		}
		// Restore scrolling on iPad
		$( document ).unbind( 'touchend.fullscreen' );
		// Trigger the onCloseFullscreen event: 
		$( embedPlayer ).trigger( 'onCloseFullScreen' );
	}
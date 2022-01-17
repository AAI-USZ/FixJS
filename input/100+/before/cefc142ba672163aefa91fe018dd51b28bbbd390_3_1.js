function( callback ) {		
		mw.log("PlayerControlBuilder:: doFullScreenPlayer" );
		// Setup pointer to control builder :
		var _this = this;

		// Setup local reference to embed player:
		var embedPlayer = this.embedPlayer;

		// Setup a local reference to the player interface:
		var $interface = embedPlayer.$interface;
		// Check fullscreen state ( if already true do nothing )
		if( this.inFullScreen == true ){
			return ;
		}
		this.inFullScreen = true;
		
		// Add fullscreen class to container
		$('#container').addClass('fullscreen');
		
		// if overlaying controls add hide show player binding. 
		if( _this.isOverlayControls() ){
			_this.addFullscreenMouseMoveHideShowControls();
		}
		
		// Store the current scroll location on the iframe: 
		$( embedPlayer ).trigger( 'fullScreenStoreVerticalScroll' );
		
		// Check for native support for fullscreen and we are in an iframe server
		if ( window.fullScreenApi.supportsFullScreen && mw.getConfig('EmbedPlayer.IsIframeServer' ) ) {
			var preFullscreenHeight = $(window).height();
			var fullscreenHeight = null;
			
			var parentWindow = window.parent; 
			var parentTarget = parentWindow.document.getElementById( this.embedPlayer.id );
			// Add a binding to catch "escape" fullscreen
			parentTarget.addEventListener( fullScreenApi.fullScreenEventName, function( event ) {
				if ( ! parentWindow.fullScreenApi.isFullScreen() ) {
					_this.restoreWindowPlayer();
				}
			});
			// Make the iframe fullscreen:
			parentWindow.fullScreenApi.requestFullScreen( parentTarget );
			
			// There is a bug with mozfullscreenchange event in all versions of firefox with supportsFullScreen 
			// https://bugzilla.mozilla.org/show_bug.cgi?id=724816
			// so we have to have an extra binding to check for size change and then restore. 
			if( $.browser.mozilla ){
				_this.fullscreenRestoreCheck = setInterval( function(){
						if( fullscreenHeight && $(window).height() < fullscreenHeight ){
							// Mozilla triggered size change:
							clearInterval ( _this.fullscreenRestoreCheck );
							_this.restoreWindowPlayer();
						}
						// set fullscreen height: 
						if( ! fullscreenHeight && preFullscreenHeight!= $(window).height() ){
							fullscreenHeight = $(window).height();
						}
				}, 250 );
			}
		} else {
			// Check for hybrid html controls / native fullscreen support:
			var vid = this.embedPlayer.getPlayerElement();
			if( mw.getConfig('EmbedPlayer.EnableIpadNativeFullscreen')
					&&
				vid && vid.webkitSupportsFullscreen 
			){
				this.doHybridNativeFullscreen();
				return ;
			} else {
				// do psudo fullscren 
				this.doFullScreenPlayerDom();
			}
		}
		
		// Bind escape to restore in page clip ( IE9 needs a secondary escape binding ) 
		$( window ).keyup( function( event ) {
			// Escape check
			if( event.keyCode == 27 ){
				_this.restoreWindowPlayer();
			}
		} );
		
		// Pass on touch move event to parent
		$( document ).bind( 'touchend.fullscreen', function(e){
			$( embedPlayer ).trigger( 'onTouchEnd' );
		});
		
		// trigger the open fullscreen event: 
		$( embedPlayer ).trigger( 'onOpenFullScreen' );
	}
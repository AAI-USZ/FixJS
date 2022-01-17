function(){
		var _this = this;
		// local ref to embedPlayer: 
		var embedPlayer = this.embedPlayer; 
		
		var $interface = embedPlayer.$interface;
		var interfaceHeight = ( _this.isOverlayControls() )
			? embedPlayer.getHeight()
			: embedPlayer.getHeight() + _this.getHeight();
	
		// only animate if we are not inside an iframe
		var aninmate = !mw.getConfig( 'EmbedPlayer.IsIframeServer' );
			
		mw.log( 'restoreWindowPlayer:: h:' + interfaceHeight + ' w:' + embedPlayer.getWidth());
		$('.mw-fullscreen-overlay').remove( 'slow' );
	
		mw.log( 'restore embedPlayer:: ' + embedPlayer.getWidth() + ' h: ' + embedPlayer.getHeight() );
		
		// Restore the player:
		embedPlayer.resizePlayer( {
			'width' : _this.preFullscreenPlayerSize.width,
			'height' : _this.preFullscreenPlayerSize.height
		}, aninmate, function(){
			var topPos = {
				'position' : _this.windowPositionStyle,
				'z-index' : _this.windowZindex,
				'overlow' : 'visible',
				'top' : '0px',
				'left' : '0px'
			};
			// Restore non-absolute layout:
			$( [ $interface, $interface.find('.playerPoster'), embedPlayer ] ).css( topPos );
			if( embedPlayer.getPlayerElement() ){
				$( embedPlayer.getPlayerElement() )
					.css( topPos )
			}
			// Restore the body scroll bar
			$('body').css( 'overflow', 'auto' );
			
			// If native player restore z-index:
			if( embedPlayer.isPersistentNativePlayer() ){
				$( embedPlayer.getPlayerElement() ).css( {
					'z-index': 'auto'
				});
			}
		});
	}
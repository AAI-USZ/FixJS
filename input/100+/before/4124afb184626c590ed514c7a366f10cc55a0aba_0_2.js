function(){
		var _this = this;
		var embedPlayer = this.embedPlayer;
		var $interface = embedPlayer.$interface;
		
		// Remove any old mw-fullscreen-overlay
		$( '.mw-fullscreen-overlay' ).remove();

		// Special hack for mediawiki monobook skin search box
		if( $( '#p-search,#p-logo' ).length ) {
			$( '#p-search,#p-logo,#ca-nstab-project a' ).css('z-index', 1);
		}

		// Add the css fixed fullscreen black overlay as a sibling to the video element
		// iOS4 does not respect z-index
		
		$interface.after(
			$( '<div />' )
			.addClass( 'mw-fullscreen-overlay' )
			// Set some arbitrary high z-index
			.css('z-index', mw.getConfig( 'EmbedPlayer.FullScreenZIndex' ) )
			.hide()
			.fadeIn("slow")
		);
		
		// get the original interface to absolute positioned:
		if( ! this.windowPositionStyle  ){
			this.windowPositionStyle = $interface.css( 'position' );
		}
		if( !this.windowZindex ){
			this.windowZindex = $interface.css( 'z-index' );
		}
		// Get the base offset:
		this.windowOffset = this.getWindowOffset();
		
		// Change the z-index of the interface
		$interface.css( {
			'position' : 'fixed',
			'z-index' : mw.getConfig( 'EmbedPlayer.FullScreenZIndex' ) + 1,
			'top' : this.windowOffset.top,
			'left' : this.windowOffset.left
		} );
		
		// If native persistent native player update z-index:
		if( embedPlayer.isPersistentNativePlayer() ){
			$( embedPlayer.getPlayerElement() ).css( {
				'z-index': mw.getConfig( 'EmbedPlayer.FullScreenZIndex' ) + 1,
				'position': 'absolute'
			});
		}

		// Empty out the parent absolute index
		_this.parentsAbsolute = [];

		// Hide the body scroll bar
		$('body').css( 'overflow', 'hidden' );

		var topOffset = '0px';
		var leftOffset = '0px';

		// Check if we have an offsetParent
		if( $interface.offsetParent()[0].tagName 
				&& 
			$interface.offsetParent()[0].tagName.toLowerCase() != 'body' ) 
		{
			topOffset = -this.windowOffset.top + 'px';
			leftOffset = -this.windowOffset.left + 'px';
		}


		// Set the player height width:
		$( embedPlayer ).css( {
			'position' : 'relative'
		} );

		// Overflow hidden in fullscreen:
		$interface.css( 'overlow', 'hidden' );
		
		// only animate if we are not inside an iframe
		var aninmate = !mw.getConfig( 'EmbedPlayer.IsIframeServer' );
		
		// Resize the player keeping aspect and with the widow scroll offset:
		embedPlayer.resizePlayer({
			'top' : topOffset,
			'left' : leftOffset,
			'width' : $( window ).width(),
			'height' : $( window ).height()
		}, aninmate, function(){
			_this.displayFullscreenTip();
		});

		// Remove absolute css of the interface parents
		$interface.parents().each( function() {
			//mw.log(' parent : ' + $( this ).attr('id' ) + ' class: ' + $( this ).attr('class') + ' pos: ' + $( this ).css( 'position' ) );
			if( $( this ).css( 'position' ) == 'absolute' ) {
				_this.parentsAbsolute.push( $( this ) );
				$( this ).css( 'position', null );
				mw.log( 'PlayerControlBuilder::  should update position: ' + $( this ).css( 'position' ) );
			}
		});

		// Bind resize resize window to resize window
		$( window ).resize( function() {
			if( _this.inFullScreen ){
				// don't resize bellow original size: 
				var targetSize = {
					'width' : $( window ).width(),
					'height' : $( window ).height()
				};
				if( targetSize.width < embedPlayer.getWidth() ){
					targetSize.width = embedPlayer.getWidth();
				}
				if( targetSize.height < embedPlayer.getHeight() ){
					targetSize.height =  embedPlayer.getHeight();
				}
				embedPlayer.resizePlayer( targetSize );
			}
		});
		
		// Add a secondary fallback resize ( sometimes iOS loses the $( window ).resize ) binding )
		setTimeout( function(){_this.syncPlayerSize()}, 50);
		setTimeout( function(){_this.syncPlayerSize()}, 200);

		// Bind escape to restore in page clip
		$( window ).keyup( function( event ) {
			// Escape check
			if( event.keyCode == 27 ){
				_this.restoreWindowPlayer();
			}
		} );
		
		
	}
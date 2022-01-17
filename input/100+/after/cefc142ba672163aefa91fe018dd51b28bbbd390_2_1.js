function(){
			localIframeInFullscreen = true;
			
			mw.log("IframePlayerApiClient:: doFullscreen> verticalScrollPosition:" + verticalScrollPosition);
			scrollToTop();
			
			// make sure the page has a zoom of 1: 
			if( !$('meta[name="viewport"]').length ){
				$('head').append( $( '<meta />' ).attr('name', 'viewport') );
			}
			$('meta[name="viewport"]').attr('content', 'initial-scale=1; maximum-scale=1; minimum-scale=1;' );
			
			// iPad 5 supports fixed position in a bad way, use absolute pos for iOS
			var playerCssPosition = ( mw.isIOS() ) ? 'absolute': 'fixed';
			// Remove absolute css of the interface parents
			$iframe.parents().each( function() {
				var $parent = $( this );
				if( $parent.css( 'position' ) == 'absolute' ) {
					parentsAbsoluteList.push( $parent );
					$parent.css( 'position', 'static' );
				}
				if( $parent.css( 'position' ) == 'relative' ) {
					parentsRelativeList.push( $parent );
					$parent.css( 'position', 'static' );
				}
			});
			
			// Don't resize bellow original size: 
			var targetSize = {
				'width' : window.innerWidth,
				'height' : window.innerHeight
			};
			
			if( mw.isIpad() ) {
				targetSize.height = targetSize.height - 14;
			}

			// Make the iframe fullscreen
			$iframe
			.css({
				'z-index': mw.getConfig( 'EmbedPlayer.FullScreenZIndex' ),
				'position': playerCssPosition,
				'top' : '0px',
				'left' : '0px',
				'width' : targetSize.width,
				'height' : targetSize.height,
				'margin': 0
			})
			.data(
				'isFullscreen', true
			);
			
			// If iPad iOS4, we don't bind to resize event, we need to update layout manually
			// TODO: check against RL17
			if( mw.isIpad() && mw.isIOS4() ) {
				var iframeWindow = _this.iframe.contentWindow;
				//console.log( 'parent window width: ' + window.innerWidth + ', height: ' + window.innerHeight );
				//console.log( 'iframe window width: ' + iframeWindow.innerWidth + ', height: ' + iframeWindow.innerHeight );
				iframeWindow.document.getElementById( _this.playerProxy.id ).updateLayout();
			}
		}
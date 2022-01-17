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
			/*
			 * We don't need that check anymore.
			 * On Desktop browsers we use native fullscreen so you unable to resize the window
			 * and that fixes issue on iPad when you enter the player while zoomed in.
			 * 
			if( targetSize.width < orgSize.width ){
				targetSize.width = orgSize.width;
			}
			if( targetSize.height < orgSize.height ){
				targetSize.height =  orgSize.height;
			}
			*/
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
		}
function(){
		var _this = this;
		var parentsAbsoluteList = [];
		var parentsRelativeList = [];
		var $iframe = $( _this.iframe );
		var orgSize = {
			'width' : $iframe.width(),
			'height' : $iframe.height(),
			'position' : $iframe.css( 'position' )
		};
		var orgStyle = $iframe.attr('style');
		var orginalViewPortContent =  $('meta[name="viewport"]').attr('content');
		
		// Add a local scope variable to register 
		// local scope fullscreen calls on orientation change
		// ( without this variable we would call fullscreen on all iframes on 
		// orientation change ) 
		var localIframeInFullscreen = false;
		var verticalScrollPosition = 0;
		
		var storeVerticalScroll = function(){
			verticalScrollPosition = (document.all ? document.scrollTop : window.pageYOffset);
		}
		var scrollToTop = function() {
			window.scroll(0, 0);
		};

		var doFullscreen = function(){
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
		}; 
		
		var restoreWindowMode = function(){
			mw.log("IframePlayerApiClient:: restoreWindowMode> verticalScrollPosition:" + verticalScrollPosition);
			localIframeInFullscreen = false;
			
			// Restore document zoom: 
			if( orginalViewPortContent ){
				$('meta[name="viewport"]').attr('content', orginalViewPortContent );
			} else{
				// Restore user zoom: ( NOTE, there does not appear to be a way to know the 
				// initial scale, so we just restore to 1 in the absence of explicit viewport tag ) 
				// In order to restore zoom, we must set maximum-scale to a valid value
				$('meta[name="viewport"]').attr('content', 'initial-scale=1; maximum-scale=8; minimum-scale=1;' );
			}
			
			$iframe
				.css( orgSize )
				.data(
					'isFullscreen', false
				)
				.attr('style', orgStyle);
			
			// restore any parent absolute pos: 
			$( parentsAbsoluteList ).each( function() {	
				$( this ).css( 'position', 'absolute' );
			} );
			$( parentsRelativeList ).each( function() {
				$( this ).css( 'position', 'relative' );
			} );
			
			// Scroll back to the previews position
			window.scroll(0, verticalScrollPosition);
		};
		alert('setup iframe client bindings');
		// Bind orientation change to resize player ( if fullscreen )
		$(window).bind( 'orientationchange', function(e){
			if( localIframeInFullscreen ){
				doFullscreen();
			}
		});

		// Bind to resize event to enlarge the player size ( if fullscreen )
		$(window).bind('resize', function() {
			if( localIframeInFullscreen ){
				doFullscreen();
			}
		});
		
		$( this.playerProxy ).bind( 'fullScreenStoreVerticalScroll', storeVerticalScroll );
		$( this.playerProxy ).bind( 'onOpenFullScreen', doFullscreen);
		$( this.playerProxy ).bind( 'onCloseFullScreen', restoreWindowMode);
		
		// prevent scrolling when in fullscreen:
		document.ontouchmove = function( e ){
			if( localIframeInFullscreen ){
				e.preventDefault();
			}
		};
	}
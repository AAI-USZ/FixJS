function(){
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
			
			// If iPad iOS4, we don't bind to resize event, we need to update layout manually
			// TODO: check against RL17
			if( mw.isIpad() && mw.isIOS4() ) {
				var iframeWindow = _this.iframe.contentWindow;
				iframeWindow.document.getElementById( _this.playerProxy.id ).updateLayout( orgSize.height );
			}
			
			// Update Iframe size
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
		}
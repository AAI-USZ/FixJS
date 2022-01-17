function(){
		var 
			_this = this,
			parentDoc = window['parent'].document,
			$parent = $( window['parent'].document ),
			$iframe = $( this.getFsTarget() ),
			parentContext = window['parent'];

		// update / reset local restore properties 
		this.verticalScrollPosition = (parentDoc.all ? parentDoc.scrollTop : parentContext.pageYOffset);
		this.parentsAbsoluteList = [];
		this.parentsRelativeList = [];
		
		// Set the original parent page scale if possible: 
		this.orginalParnetViewPortContent = $parent.find( 'meta[name="viewport"]' ).attr( 'content' );
		this.orginalParentIframeLayout = {
				'style' : $iframe[0].style.cssText,
				'width' : $iframe.attr('width'),
				'height' : $iframe.attr('height')
		}
		
		mw.log("PlayerControls:: doParentIframeFullscreen> verticalScrollPosition:" + this.verticalScrollPosition);
		parentContext.scroll(0, 0);

		// Make sure the parent page page has a zoom of 1:
		if( ! $parent.find('meta[name="viewport"]').length ){
			$parent.find('head').append( $( '<meta />' ).attr('name', 'viewport') );
		}
		$parent.find('meta[name="viewport"]').attr('content', 'initial-scale=1; maximum-scale=1; minimum-scale=1;' );

		// iPad 5 supports fixed position in a bad way, use absolute pos for iOS
		var playerCssPosition = ( mw.isIOS() ) ? 'absolute': 'fixed';
		
		// Remove absolute css of the iframe parents
		$iframe.parents().each( function() {
			var $parent = $( this );
			if( $parent.css( 'position' ) == 'absolute' ) {
				_this.parentsAbsoluteList.push( $parent );
				$parent.css( 'position', 'static' );
			}
			if( $parent.css( 'position' ) == 'relative' ) {
				_this.parentsRelativeList.push( $parent );
				$parent.css( 'position', 'static' );
			}
		});

		// Make the iframe fullscreen
		$iframe
			.css({
				'z-index': mw.getConfig( 'EmbedPlayer.FullScreenZIndex' ),
				'position': playerCssPosition,
				'top' : '0px',
				'left' : '0px',
				'margin': 0
			})
			.data(
				'isFullscreen', true
			);
				
		var updateIframeSize = function() {
			$iframe.css({
				'width' : parentContext.innerWidth,
				'height' : parentContext.innerHeight
			});
		};				
		
		updateIframeSize();
		
		// Bind orientation change to resize player ( if fullscreen )
		$( parentContext ).bind( 'orientationchange', function(e){
			if( _this.isInFullScreen() ){
				updateIframeSize();
			}
		});

		// prevent scrolling when in fullscreen:
		document.ontouchmove = function( e ){
			if( _this.isInFullScreen() ){
				e.preventDefault();
			}
		};
	}
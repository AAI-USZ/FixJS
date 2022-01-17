function(){
			var _this = this;
			mw.log( "TimedText:: addBelowVideoCaptionContainer" );
			var $playerTarget = this.embedPlayer.$interface;
			if( $playerTarget.find('.captionContainer').length || mw.isIphone() ) {
				return ;
			}			
			// Append before controls:			
			$playerTarget.find( '.control-bar' ).before(
				$('<div>').addClass( 'captionContainer' )
				.css({
					'position' : 'absolute',
					'top' : this.embedPlayer.getHeight(),
					'display' : 'block',
					'width' : '100%',
					'height' : mw.getConfig('TimedText.BelowVideoBlackBoxHeight') + 'px',
					'background-color' : '#000',
					'text-align' : 'center',
					'padding-top' : '5px'
				} )
			);
			
			// Resize the interface for layoutMode == 'below' ( if not in full screen)
			if( this.embedPlayer.controlBuilder.inFullScreen || this.embedPlayer.data('updatedIframeContainer') ){
				_this.positionCaptionContainer();
			} else {
				// give the dom time to resize. 
				setTimeout(function(){
					// get the orginal player height
					_this.originalPlayerHeight = _this.embedPlayer.$interface.css( 'height' );			
					
					var height = parseInt( _this.originalPlayerHeight ) + ( mw.getConfig('TimedText.BelowVideoBlackBoxHeight') + 8 );
					var newCss = {
						'height' : height + 'px'
					};
						
					_this.embedPlayer.$interface.css( newCss );
					$( _this.embedPlayer ).css( newCss );
					$( _this.embedPlayer.getPlayerElement() ).css( newCss );
					
					// Trigger an event to resize the iframe: 
					_this.embedPlayer.triggerHelper( 'resizeIframeContainer', [{'height' : height}] );
					
					_this.embedPlayer.data('updatedIframeContainer', true);
				}, 50);
			}
		}
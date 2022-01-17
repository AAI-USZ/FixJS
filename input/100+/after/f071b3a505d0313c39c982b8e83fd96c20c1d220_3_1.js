function(){
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
					
					$( _this.embedPlayer ).data('updatedIframeContainer', true);
				}
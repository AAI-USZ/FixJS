function( ctrlObj ) {
				var $btn = $( '<div />' )
						.attr( 'title', gM( 'mwe-embedplayer-player_fullscreen' ) )
						.addClass( "ui-state-default ui-corner-all ui-icon_link rButton fullscreen-btn" )
						.append(
							$( '<span />' )
							.addClass( "ui-icon ui-icon-arrow-4-diag" )
						)
						// Fullscreen binding:
						.buttonHover();
				// Link out to another window if iPad 3x ( broken iframe resize ) 
				if( (
						mw.getConfig('EmbedPlayer.IsIframeServer') 
						&& 
						mw.isIpad3() 
					)
						||
					  mw.getConfig( "EmbedPlayer.NewWindowFullscreen" ) 
					  	||
					( mw.getConfig('EmbedPlayer.IsIframeServer')  && mw.getConfig('EmbedPlayer.EnableIframeApi') === false )
				){
					// Get the iframe url: 
					var url = ctrlObj.embedPlayer.getIframeSourceUrl();
					url += '?' + kWidget.flashVarsToUrl( ctrlObj.embedPlayer.getFlashvars() );
					
					// Change button into new window ( of the same url as the iframe ) : 
					return	$('<a />').attr({
							'href': url,
							'target' : '_new'
						})
						.click(function(){
							// Update the url: 			
							var url = $(this).attr('href');
							mw.setConfig('EmbedPlayer.IsFullscreenIframe', true);
							// add a seek offset:
							mw.setConfig('EmbedPlayer.IframeCurrentTime',  ctrlObj.embedPlayer.currentTime );
							// add play state:
							mw.setConfig('EmbedPlayer.IframeIsPlaying',  ctrlObj.embedPlayer.isPlaying() );
							
							url += mw.getIframeHash();
							ctrlObj.embedPlayer.pause();
							// try and do a browser popup:
							var newwin = window.open(
								 url, 
								 ctrlObj.embedPlayer.id, 
								 // Fullscreen window params: 
								'width=' + screen.width + 
								', height=' + ( screen.height - 90 ) +
								', top=0, left=0' + 
								', fullscreen=yes'
							);						
							// if for some reason we could not open the window run the href link:
							if( newwin === null){
								return true;
							}
							if ( window.focus ) {
								newwin.focus();
							}
							// Else do not follow the href link
							return false;
						})
						.append($btn);
				} else {
					return $btn.click( function() {
						ctrlObj.embedPlayer.fullscreen();
					} );
				}
			}
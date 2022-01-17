function doRewriteIframe (iframeParams,  playerTarget ){
			// Build the iframe request from supplied iframeParams: 
			var iframeRequest = '';
			for( var key in iframeParams ){
				// Only encode valid kwidget attributes into the url
				if( key != 'p' && key && 'cache_st' && key != 'wid' 
					&& key != 'uiconf_id' && key != 'entry_id' 
				){
					continue;
				}
				iframeRequest+= '/' + key + 
					'/' + encodeURIComponent( iframeParams [ key ] );
			}
			// Add the player id: 
			iframeRequest+= '/?playerId=' + $( playerTarget ).attr('id');
			
			// Add the width and height of the player
			iframeRequest+= '&iframeSize=' +  $( playerTarget ).width() + 
							'x' + $(playerTarget).height();
				
			// Add &debug is in debug mode
			if( mw.getConfig( 'debug') ){
				iframeRequest+= '&debug=true';
			}
			
			// If remote service is enabled pass along service arguments: 
			if( mw.getConfig( 'Kaltura.AllowIframeRemoteService' )  && 
				(
					mw.getConfig("Kaltura.ServiceUrl").indexOf('kaltura.com') === -1 &&
					mw.getConfig("Kaltura.ServiceUrl").indexOf('kaltura.org') === -1 
				)
			){
				iframeRequest += kWidget.serviceConfigToUrl();
			}
		
			// Add no cache flag if set:
			if( mw.getConfig('Kaltura.NoApiCache') ) {
				iframeRequest+= '&nocache=true';
			}
			// Add the flashvars to the request:
			if( iframeParams['flashvars'] ){
				$.each( iframeParams['flashvars'], function( key, value){
					if( key ) {
						iframeRequest += '&' + encodeURIComponent( 'flashvars[' + key + ']' ) +
							'=' + encodeURIComponent( value );
					}
				});
			}
			// Also append the script version to purge the cdn cache for iframe: 
			iframeRequest += '&urid=' + KALTURA_LOADER_VERSION;

			var baseClass = $( playerTarget ).attr('class' ) ? $( playerTarget ).attr('class' ) + ' ' : '';
			var iframeId = $( playerTarget ).attr('id') + '_ifp';
			var iframeStyle = ( $( playerTarget ).attr('style') ) ? $( playerTarget ).attr('style') : '';
			var iframeCss = { 'border': '0px' };
			
			$.extend(iframeCss, kWidget.getAdditionalTargetCss());
			
			var $iframe = $('<iframe />')
				.attr({
					'id' : iframeId,
					'name' : iframeId,
					'class' : baseClass + 'mwEmbedKalturaIframe',					
					'height' : $( playerTarget ).height(),
					'width' : $( playerTarget ).width(),
					'allowfullscreen' : true
				})
				.attr('style', iframeStyle)
				.css(iframeCss);
			
			// Create the iframe proxy that wraps the actual $iframe
			// and will be converted into an "iframe" player via jQuery.fn.iFramePlayer call
			var $iframeProxy = $('<div />').attr({
				'id' : $( playerTarget ).attr('id'),
				'name' : $( playerTarget ).attr('id')
			})
			.attr('style', iframeStyle)
			.css(iframeCss)
			.append( $iframe );
			
			// Setup the iframe ur
			var iframeUrl = mw.getMwEmbedPath() + 'mwEmbedFrame.php' + iframeRequest;
			
			// Check if we are setting iframe src or propagating via callback:
			if( mw.getConfig('EmbedPlayer.PageDomainIframe') ){
				// Set the iframe contents via callback replace any non-alpha numeric charachters 
				var cbName = 'mwi_' + iframeId.replace(/[^0-9a-zA-Z]/g, '');
				if( window[ cbName ] ){
					mw.log( "Error: iframe callback already defined: " + cbName );	
					cbName += parseInt( Math.random()* 1000 );
				}
				window[ cbName ] = function( iframeData ){
					var newDoc = $( '#' + iframeId )[0].contentDocument;
					newDoc.open();
					newDoc.write( iframeData.content );
					newDoc.close();
					// Invoke the iframe player api system:
					$iframeProxy.iFramePlayer( callback );
					
					// Clear out this global function 
					window[ cbName ] = null;
				};
				// Replace the player with the iframe: 
				$( playerTarget ).replaceWith( $iframeProxy );
				$.getScript( iframeUrl + '&callback=' + cbName );
			} else {
				iframeUrl += mw.getIframeHash( iframeId );
				// update the iframe url:
				$iframe.attr( 'src', iframeUrl );
				
				// Replace the player with the iframe: 
				$( playerTarget ).replaceWith( $iframeProxy );
			
				if(  mw.getConfig('EmbedPlayer.EnableIframeApi') ){
					// Invoke the iframe player api system:
					$iframeProxy.iFramePlayer( callback );
				}
			}
		}
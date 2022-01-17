function( iframeData ){
					var newDoc = $( '#' + iframeId )[0].contentDocument;
					newDoc.open();
					newDoc.write( iframeData.content );
					newDoc.close();
					if( mw.getConfig('EmbedPlayer.EnableIframeApi') ){
						// Invoke the iframe player api system:
						$iframeProxy.iFramePlayer( callback );
					} else {
						callback();
					}
					// Clear out this global function 
					window[ cbName ] = null;
				}
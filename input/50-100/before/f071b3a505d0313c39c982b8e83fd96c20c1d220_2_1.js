function( iframeData ){
					var newDoc = $( '#' + iframeId )[0].contentDocument;
					newDoc.open();
					newDoc.write( iframeData.content );
					newDoc.close();
					// Invoke the iframe player api system:
					$iframeProxy.iFramePlayer( callback );
					
					// Clear out this global function 
					window[ cbName ] = null;
				}
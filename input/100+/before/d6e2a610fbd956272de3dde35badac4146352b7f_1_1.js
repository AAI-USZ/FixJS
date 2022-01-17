function(){
				//  $uiConf disappears in this scope: maybe a timeout in mw.load 
				// XXX RL17 re-check this
				var $uiConf = embedPlayer.$uiConf;
				var layout;
				// Check ui-conf for horizontal or vertical playlist
				// Were know if the playlist is vertical or horizontal based on the parent element of the #playlist
				// vbox - vertical | hbox - horizontal 
				if( $uiConf.find('#playlistHolder').length ){
					layout = ( parseInt( $uiConf.find('#playlistHolder').attr('width') ) != 100 ) ? 
								'horizontal' : 
								'vertical';
				} else {
					mw.log("Error could not determine playlist layout type ( use target size ) ");
					layout = ( $container.width() < $container.height() ) 
						? 'vertical' : 'horizontal';
				}
				
				// Create our playlist container
				var $playlist = $( '<div />' ).attr( 'id', 'playlistContainer' );
				// Add layout to cotainer class
				if( ! embedPlayer.isPluginEnabled( 'related' ) ) {
					$container.addClass( layout );
				}
				if( ! $('#playlistContainer').length ) {
					if( layout == 'horizontal' ) {
						$('#playerContainer').before( $playlist );
					} else {
						$('#playerContainer').after( $playlist );
					}
				}
				
				$playlist.playlist({
					'layout': layout,
					'embedPlayer' : embedPlayer
				}); 
				callback();
			}
function() {
			var playlistSize = _this.getPlaylistSize();
			if( layout == 'vertical' ){
				if( playlistSize.height == '100%' ) {
					// iOS window.innerHeight return the height of the entire content and not the window so we get the iframe height
					var windowHeight  = (mw.isIOS()) ? $( window.parent.document.getElementById( embedPlayer.id ) ).height() : window.innerHeight;
					playlistSize.height = ( windowHeight - embedPlayer.getComponentsHeight() );
				}
				$('#playlistContainer').height( playlistSize.height );
			} else {
				$('#playlistContainer').width( playlistSize.width );
			}			
		}
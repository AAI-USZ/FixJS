function( layout ) {
		
		var embedPlayer =  this.playlist.getEmbedPlayer();
		
		// Hide our player if not needed
		var playerHolder = embedPlayer.getKalturaConfig('PlayerHolder', ["visible", "includeInLayout"]);
		if( ( playerHolder.visible === false  || playerHolder.includeInLayout === false ) && !embedPlayer.useNativePlayerControls() ) {
			embedPlayer.displayPlayer = false;
		}
		
		var playlistHolder = embedPlayer.getKalturaConfig('playlistHolder', ['width', 'height']);
		var updateLayout = function() {
			if( layout == 'vertical' ){
				if( playlistHolder.height == '100%' ) {
					playlistHolder.height = (window.innerHeight - embedPlayer.getComponentsHeight() );
				}
				$('#playlistContainer').height( playlistHolder.height + 'px' );
			} else {
				$('#playlistContainer').width( playlistHolder.width + 'px' );
				$('#playerContainer').css( 'margin-right', playlistHolder.width + 'px' );
			}			
		};
		updateLayout();
		embedPlayer.bindHelper( 'updateLayout' + this.bindPostFix, updateLayout);
	}
function(){
		var embedPlayer = this.embedPlayer;
		mw.log( "PlayerControlBuilder::syncPlayerSize: window:" +  $(window).width() + ' player: ' + $( embedPlayer ).width() );
		// don't sync player size if inline player while not fullscreen.
		if( !mw.getConfig('EmbedPlayer.IsIframeServer' ) && ! this.inFullScreen ){
			return ;
		}
		
		// resize to the playlist  container
		// TODO  change this to an event so player with interface around it ( ppt widget etc ) can
		// set the player to the right size. 
		if( embedPlayer.playlist && ! this.inFullScreen ){
			embedPlayer.playlist.syncPlayerSize();
		} else {
			embedPlayer.resizePlayer( this.getWindowSize() );
		}
	}
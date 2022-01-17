function( userAction ) {
		mw.log( 'EmbedPlayer::toggleMute> (old state:) ' + this.muted );
		if ( this.muted ) {
			this.muted = false;
			var percent = this.preMuteVolume;
		} else {
			this.muted = true;
			this.preMuteVolume = this.volume;
			var percent = 0;
		}
		// will auto trigger because of slider change, so no need to trigger volume change in this call
		this.setVolume( percent );
		// Update the interface
		this.setInterfaceVolume( percent );
		// trigger the onToggleMute event
		$( this ).trigger('onToggleMute');
	}
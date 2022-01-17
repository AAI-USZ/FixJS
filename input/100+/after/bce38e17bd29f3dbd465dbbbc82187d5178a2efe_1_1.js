function() {
		var embedPlayer =  this.playlist.getEmbedPlayer();

		// Get Width
		var pWidth = embedPlayer.getKalturaConfig('playlistHolder', 'width');
		if( ! pWidth ) {
			pWidth = embedPlayer.getKalturaConfig('playlist', 'width');
		}
		// Get Height
		var pHeight = embedPlayer.getKalturaConfig('playlistHolder', 'height');
		if( ! pHeight ) {
			pHeight = embedPlayer.getKalturaConfig('playlist', 'height');
		}

		// Add px if not percentage
		if( typeof pWidth == 'string' && pWidth.indexOf('%') == -1 ) {
			pWidth = pWidth + 'px';
		}
		if( typeof pHeight == 'string' && pHeight.indexOf('%') == -1 ) {
			pHeight = pHeight + 'px';
		}

		return {
			width: pWidth,
			height: pHeight
		};
	}
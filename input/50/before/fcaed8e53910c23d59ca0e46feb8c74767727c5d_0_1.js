function() {
		pushInQueue({type: "updateAlbumHits"})
		pushInQueue({type: "updateArtistHits"})
        pushInQueue({type: "updateSongsHits"});
    }
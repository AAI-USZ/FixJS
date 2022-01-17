function(e) {
		//console.log("Live watcher called");
		if ($(LFM_WATCHED_CONTAINER).length > 0) {
			LFM_updateNowPlaying();
			return;    
		}
	}
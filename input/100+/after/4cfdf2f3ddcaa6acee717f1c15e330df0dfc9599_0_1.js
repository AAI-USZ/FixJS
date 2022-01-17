function LFM_updateNowPlaying(){
	// Acquire data from page
	title = LFM_TRACK_TITLE();
	artist = LFM_TRACK_ARTIST();
	duration = LFM_TRACK_DURATION();
	newTrack = title + " " + artist;
	// Update scrobbler if necessary
	if (newTrack != "" && newTrack != LFM_lastTrack){
		if (duration == 0) {
			// Nasty workaround for delayed duration visiblity with skipped tracks.
			setTimeout(LFM_updateNowPlaying, 5000);
			return 0;
		}
		console.log("submitting a now playing request. artist: "+artist+", title: "+title+", duration: "+duration);
		LFM_lastTrack = newTrack;
		chrome.extension.sendRequest({type: 'validate', artist: artist, track: title}, function(response) {
			if (response != false) {
				chrome.extension.sendRequest({type: 'nowPlaying', artist: artist, track: title, duration: duration});
			} else { // on failure send nowPlaying 'unknown song'
				chrome.extension.sendRequest({type: 'nowPlaying', duration: duration});
			}
		});
	}	
	LFM_isWaiting = 0;
}
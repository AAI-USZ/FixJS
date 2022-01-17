function LFM_updateNowPlaying(){
	console.log("LFM_updateNowPlaying()");
	title = LFM_TRACK_TITLE();
	artist = LFM_TRACK_ARTIST();
	album = LFM_TRACK_ALBUM();
	duration = LFM_TRACK_DURATION();
	newTrack = title + " " + artist;
	if (newTrack != "" && newTrack != LFM_lastTrack){
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
}
function(){
	console.log("Pandora module starting up");

	$(LFM_WATCHED_CONTAINER).live('DOMSubtreeModified', function(e) {
		//console.log("Live watcher called");
		if ($(LFM_WATCHED_CONTAINER).length > 0) {
			LFM_updateNowPlaying();
			return;    
		}
	});

	$(window).unload(function() {      
		chrome.extension.sendRequest({type: 'reset'});
		return true;      
	});

	LFM_updateNowPlaying();
}
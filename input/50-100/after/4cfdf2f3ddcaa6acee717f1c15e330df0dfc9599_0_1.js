function(){
	console.log("Pandora module starting up");

	$(LFM_WATCHED_CONTAINER).live('DOMSubtreeModified', function(e) {
		//console.log("Live watcher called");
		if ($(LFM_WATCHED_CONTAINER).length > 0) {
			if(LFM_isWaiting == 0){
				LFM_isWaiting = 1;
				setTimeout(LFM_updateNowPlaying, 10000);
			}
			return;    
		}
	});

	$(window).unload(function() {      
		chrome.extension.sendRequest({type: 'reset'});
		return true;      
	});
}
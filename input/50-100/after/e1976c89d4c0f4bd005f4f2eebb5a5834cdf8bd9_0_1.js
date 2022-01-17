function onytplayerStateChange(newState) {

	console.log("test");

	if (playlist_mode == "on") {
		
		if (newState == 0) {
			
			//Next Video
			video_src = getNextVideoFromPlaylist();
			
			if (video_src != null) {
				
				video_player.loadVideoByUrl(video_src);
			}
		}
	}
}
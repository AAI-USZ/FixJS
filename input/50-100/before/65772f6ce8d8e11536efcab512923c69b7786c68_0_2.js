function onytplayerStateChange(newState) {

	if (playlist_mode == "on") {
		
		if (newState == 0) {
			
			//Next Video
			video_src = getNextVideoFromPlaylist();
			
			if (video_src != null) {
				
				console.log("im here");
				
				video_player.loadVideoByUrl(video_src);
			}
		}
	}
}
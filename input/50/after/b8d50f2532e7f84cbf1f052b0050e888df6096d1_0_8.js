function ytTogglePlay() {
    if (yt_player) {
	//unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5)
	if(yt_player.getPlayerState() !== 1){
	    yt_player.playVideo();
	}else{
	    yt_player.pauseVideo();
	}
    }
}
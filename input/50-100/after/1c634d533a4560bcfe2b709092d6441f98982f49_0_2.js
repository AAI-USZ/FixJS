function videoLayerPlaylistOpen() {
	
	current_video = null;
	
	playlist = get_cookie("playlist");
	
	playlist_mode = "on";
	
	video_src = getNextVideoFromPlaylist();
	
	new_video_player(video_src);
	
	$('.videoLayer').show().animate({
		opacity: 1
	},300, function() {
		$('.videoPlayer').show();
		$('.playListLeft').show();
		$('.playListRight').show();
	});
}
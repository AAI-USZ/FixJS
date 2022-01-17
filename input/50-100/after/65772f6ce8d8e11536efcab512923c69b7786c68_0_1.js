function new_video_player(video_src) {
	
	if ($(".videoPlayer object").length > 0) {
		
		$(".videoPlayer object").replaceWith('<div id="player_container"></div>');
	}
	
	if ($("#player_container").length > 0) {
		
		var params = { allowScriptAccess: "always" };
		var atts = { id: "player" };
		swfobject.embedSWF(video_src,
						   "player_container", "800", "500", "8", null, null, params, atts);
	}
}
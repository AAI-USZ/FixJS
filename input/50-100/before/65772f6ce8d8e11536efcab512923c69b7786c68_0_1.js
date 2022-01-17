function new_video_player(video_src) {
	
	var params = { allowScriptAccess: "always" };
    var atts = { id: "player" };
    swfobject.embedSWF(video_src,
                       "player_container", "800", "500", "8", null, null, params, atts);
}
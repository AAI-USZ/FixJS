function new_video_player(video_src) {
	
	if ($(".videoPlayer object").length > 0) {
		
		$(".videoPlayer object").replaceWith('<div id="player_container"></div>');
	}
	
	if ($("#player_container").length > 0) {
		
		html = '<embed id="player" style="width: 800px; height: 500px;" wmode="opaque" src="' + video_src + '" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always">';
		
		$("#player_container").replaceWith(html);
	}
}
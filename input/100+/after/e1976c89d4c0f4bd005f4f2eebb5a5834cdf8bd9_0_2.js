function new_video_player(video_src) {
	
	if ($(".videoPlayer object").length > 0) {
		
		$(".videoPlayer object").replaceWith('<div id="player_container"></div>');
	}
	
	if ($("#player_container").length > 0) {
		
		
		
		if (swfobject.hasFlashPlayerVersion("8.0.0")) {
			
			var params = {	allowScriptAccess: "always",
							movie: video_src,
							wmode: "opaque",
							"allowFullScreen": true
			};
			var atts = { id: "player" };
			swfobject.embedSWF(video_src,
							   "player_container", "800", "500", "8", null, null, params, atts);
		}
		else {
			
			html = '<object id="player" data="' + video_src + '" width="800" height="500">';
			html+= '<param name="movie" value="' + video_src + '">';
			html+= '<param name="wmode" value="opaque"/>';
			html+= '<param name="allowFullScreen" value="true">';
			html+= '<param name="allowScriptAccess" value="always">';
			html+= '<embed wmode="opaque" src="' + video_src + '" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always">';
			html+= '</object>';
			html = '<iframe class="youtube-player" type="text/html" width="640" height="385" src="' + video_src + '" frameborder="0"></iframe>';
			
			$("#player_container").replaceWith(html);
		}
	}
}
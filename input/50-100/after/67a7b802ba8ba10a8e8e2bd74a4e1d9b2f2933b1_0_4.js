function new_video_player(video_src) {
	
	if ($(".videoPlayer object").length > 0) {
		
		$(".videoPlayer object").replaceWith('<div id="player_container"></div>');
	}
	
	if ($("#player_container").length > 0) {

		/*
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
			*/
			
			
			video_player = new YT.Player('player', {
				height: '500',
				width: '800',
				videoId: 'u1zgFlCw8Aw',
				events: {
				  'onReady': onPlayerReady,
				  'onStateChange': onPlayerStateChange
				}
			  });
			
			/*
			html = '<object id="player" data="' + video_src + '" style="width: 800px; height: 500px;">';
			html+= '<param name="movie" value="' + video_src + '">';
			html+= '<param name="wmode" value="opaque"/>';
			html+= '<param name="allowFullScreen" value="true">';
			html+= '<param name="allowScriptAccess" value="always">';
			html+= '<embed style="width: 800px; height: 500px;" wmode="opaque" src="' + video_src + '" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always">';
			html+= '</object>';

			$("#player_container").replaceWith(html);
			*/
		//}
	}
}
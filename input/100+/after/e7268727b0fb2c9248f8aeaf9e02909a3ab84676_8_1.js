function parseXSPlaylist(playlistURL, baseURL, altPosterURL, track, handlePlaylistData) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", playlistURL, true);
	xhr.addEventListener("load", function() {
		var x = xhr.responseXML.getElementsByTagName("track");
		var playlist = [];
		var audioOnly = true;
		var startTrack = track;
		if(!(track >= 0 && track < x.length)) track = 0;
		var list, I, info, mediaURL, posterURL, title;
		
		for(var i = 0; i < x.length; i++) {
			// what about <jwplayer:streamer> rtmp??
			I = (i + track) % x.length;
			list = x[I].getElementsByTagName("location");
			if(list.length > 0) mediaURL = makeAbsoluteURL(list[0].textContent, baseURL);
			else if(i === 0) return;
			else continue;
			info = urlInfo(mediaURL);
			if(!info) {
				if(i === 0) return;
				if(i >= x.length - track) --startTrack;
				continue;
			} else if(!info.isAudio) audioOnly = false;
			info.url = mediaURL;
			
			list = x[I].getElementsByTagName("image");
			if(list.length > 0) posterURL = list[0].textContent;
			if(i === 0 && !posterURL) posterURL = altPosterURL;
			list = x[I].getElementsByTagName("title");
			if(list.length > 0) title = list[0].textContent;
			else {
				list = x[I].getElementsByTagName("annotation");
				if(list.length > 0) title = list[0].textContent;
			}
			
			playlist.push({
				"sources": [info],
				"poster": posterURL,
				"title": title
			});
		}
		handlePlaylistData({"playlist": playlist, "startTrack": startTrack, "audioOnly": audioOnly});
	}, false);
	xhr.send(null);
}
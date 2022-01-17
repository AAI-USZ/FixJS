function getSongIDFromTitle( artist, songTitle, artistHot, songHot, variety ) {
	var url = "http://" + apiHost + "/api/v4/song/search?api_key=" + apiKey + "&callback=?";

	$.getJSON( url, 
		{
			'artist': artist,
			'title': songTitle,
			'format':'jsonp'
//			'bucket': ['tracks', 'id:spotify-WW'],
//			'limit': true,
		}, function(data) {
				console.log("=== in getSongIDFromTitle; received a response");
				var response = data.response;
				var songs = response.songs;
				var song = songs[0];
				
				if( song ) {
					console.log("=== looking for song: " + songTitle + " and got: " + song.id + " (" + song.title + ")"  );
				
					innerGeneratePlaylist( artist, song.id, song.title, artistHot, songHot, variety, false );
				} else {
					alert("We can't find that song");
				}
			});
}
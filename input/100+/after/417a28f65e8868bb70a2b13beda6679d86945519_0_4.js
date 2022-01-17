function( qid, searchString )
	{
		var apiQuery = "http://api.soundcloud.com/tracks.json?consumer_key=TiNg2DRYhBnp01DA3zNag&filter=streamable&q=" + encodeURIComponent(searchString.replace('"', '').replace("'", ""));
		var that = this;
		var empty = {
			results: [],
			qid: qid
		};
		Tomahawk.asyncRequest(apiQuery, function(xhr) {
			var resp = JSON.parse(xhr.responseText);
			if (resp.length !== 0){
				var results = [];
				var stop = resp.length;
				for (i = 0; i < resp.length; i++) {
					if(resp[i] === undefined){
						stop = stop - 1;
						continue;
					}
					var result = new Object();

					if (that.getTrack(resp[i].title, "")){
						var track = resp[i].title;
						if(track.indexOf(" - ") !== -1 && track.slice(track.indexOf(" - ") + 3).trim() !== ""){
							result.track = track.slice(track.indexOf(" - ") + 3).trim();
							result.artist = track.slice(0, track.indexOf(" - ")).trim();
						}
						else if(track.indexOf(" -") !== -1 && track.slice(track.indexOf(" -") + 2).trim() !== ""){
							result.track = track.slice(track.indexOf(" -") + 2).trim();
							result.artist = track.slice(0, track.indexOf(" -")).trim();
						}
						else if(track.indexOf(": ") !== -1 && track.slice(track.indexOf(": ") + 2).trim() !== ""){
							result.track = track.slice(track.indexOf(": ") + 2).trim();
							result.artist = track.slice(0, track.indexOf(": ")).trim();
						}
						else if(track.indexOf("-") !== -1 && track.slice(track.indexOf("-") + 1).trim() !== ""){
							result.track = track.slice(track.indexOf("-") + 1).trim();
							result.artist = track.slice(0, track.indexOf("-")).trim();
						}
						else if(track.indexOf(":") !== -1 && track.slice(track.indexOf(":") + 1).trim() !== ""){
							result.track = track.slice(track.indexOf(":") + 1).trim();
							result.artist = track.slice(0, track.indexOf(":")).trim();
						}
						else if(track.indexOf("\u2014") !== -1 && track.slice(track.indexOf("\u2014") + 2).trim() !== ""){
							result.track = track.slice(track.indexOf("\u2014") + 2).trim();
							result.artist = track.slice(0, track.indexOf("\u2014")).trim();
						}
						else if( resp[i].title !== "" && resp[i].user.username !== ""){
							// Last resort, the artist is the username
							result.track = resp[i].title;
							result.artist = resp[i].user.username;
							
						}
						else {
							stop = stop - 1;
							continue;
						}
					}
					else {
						stop = stop - 1;
						continue;
					}

					result.source = that.settings.name;
					result.mimetype = "audio/mpeg";
					result.bitrate = 128;
					result.duration = resp[i].duration / 1000;
					result.score = 0.85;
					result.year = resp[i].release_year;
					result.url = resp[i].stream_url + ".json?client_id=TiNg2DRYhBnp01DA3zNag";
					
					(function(i, result) {
						var artist = encodeURIComponent(result.artist.capitalize());
						var url = "http://developer.echonest.com/api/v4/artist/extract?api_key=JRIHWEP6GPOER2QQ6&format=json&results=1&sort=hotttnesss-desc&text=" + artist;
						var xhr = new XMLHttpRequest();
						xhr.open('GET', url, true);
						xhr.onreadystatechange = function() {
								if (xhr.readyState === 4){
									if(xhr.status === 200) {
										var response = JSON.parse(xhr.responseText).response;
										if (response && response.artists && response.artists.length > 0) {
											artist = response.artists[0].name;
											result.artist = artist;
											result.id = i;
											results.push(result);
											stop = stop - 1;
										}
										else {
											stop = stop - 1;
										}
										if (stop === 0) {
											function sortResults(a, b){
												return a.id - b.id;
											}
											results = results.sort(sortResults);
											for (var j = 0; j < results.length; j++){
												delete results[j].id;
											}
											var toReturn = {
												results: results,
												qid: qid
											};
											Tomahawk.addTrackResults(toReturn);
										}
									}
									else {
										Tomahawk.log("Failed to do GET request to: " + url);
										Tomahawk.log("Error: " + xhr.status + " " + xhr.statusText);
									}
								}
						};
						xhr.send(null);
					})(i, result);	
				}
				if (stop === 0){
					Tomahawk.addTrackResults(empty);
				}
			}
			else {
				Tomahawk.addTrackResults(empty);
			}
		});
	}
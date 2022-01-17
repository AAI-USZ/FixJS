function(error, track_collection) {
		if (error)
			callback(error)
		else {
			if (typeof (tracks.length) == "undefined")
				tracks = [ tracks ];

			for ( var i = 0; i < tracks.length; i++) {
				track = tracks[i];
				track.created_at = new Date();
				// if( article.comments === undefined ) article.comments = [];
				// for(var j =0;j< article.comments.length; j++) {
				// article.comments[j].created_at = new Date();
				// }
			}

			track_collection.insert(tracks, function() {
				callback(null, tracks);
			});
		}
	}
function() {

		var insert_artist = db.prepare("INSERT INTO artists (name) VALUES (?);");
      	insert_artist.run(SqlString.escape(song.artist));
  		insert_artist.finalize();

		db.get('SELECT * FROM artists where name like ?', [ SqlString.escape(song.artist) ], function(err, artist) {
			if(err) throw err;
			var artist_id = artist.id;
			db.run('INSERT INTO albums (name, artist_id) VALUES (?, ?);', [ SqlString.escape(song.album), artist_id ]);
			db.get('SELECT * FROM albums where name = ? and artist_id = ?', [ SqlString.escape(song.album), artist_id], function(err, album) {
				if(err) throw err;
				var album_id = album.id;
				var tracknumber = 0; 
				if(song.track != undefined && song.track.no != undefined) {
					tracknumber = song.track.no;
				}
				db.run('INSERT INTO songs (name, path, tracknumber, artist_id, album_id) VALUES (?, ?, ?, ?, ?);', [ SqlString.escape(song.title), SqlString.escape(path), tracknumber, artist_id, album_id ]);
				return callback(true, song, artist, album);
			});
    	});
	}
function() {

  		db.run("INSERT INTO artists (name) VALUES ($name)", {
        	$name: song.artist.toString()
    	});

		db.get('SELECT * FROM artists where name like $name', { 
			$name: song.artist.toString() 
			}, function(err, artist) {
			if(err) throw err;
			var artist_id = artist.id;
			db.run("INSERT INTO albums (name, artist_id) VALUES ($name, $artist_id)", {
        		$name: song.album.toString(),
        		$artist_id: artist_id
    		});
			db.get('SELECT * FROM albums where name = $name and artist_id = $artist_id', {
        			$name: song.album.toString(),
        			$artist_id: artist_id
    			}, function(err, album) {
				if(err) throw err;
				var album_id = album.id;
				var tracknumber = 0; 
				if(song.track != undefined && song.track.no != undefined) {
					tracknumber = song.track.no;
				}
				db.run('INSERT INTO songs (name, path, tracknumber, artist_id, album_id) VALUES ($name, $path, $tracknumber, $artist_id, $album_id);', {
					$name: song.title.toString(),
					$path: path.toString(),
					$tracknumber: tracknumber,
					$artist_id: artist_id,
					$album_id: album_id
				});
				return callback(true, song, artist, album);
			});
    	});
	}
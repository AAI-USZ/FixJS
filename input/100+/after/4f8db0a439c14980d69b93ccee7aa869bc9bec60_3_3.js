function(err, album) {
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
			}
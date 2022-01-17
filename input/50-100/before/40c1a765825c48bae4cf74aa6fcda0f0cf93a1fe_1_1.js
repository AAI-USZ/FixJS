function(err, row) {
			if(err) {
				log.inspect("Error with album " + album_id);
				log.inspect(err);
				log.inspect(row);
				//throw err;
			}
			return callback(row.albumart_sml != undefined && row.albumart_sml != '');
		}
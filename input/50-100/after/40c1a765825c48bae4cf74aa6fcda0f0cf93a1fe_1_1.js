function(err, row) {
			if(err) {
				callback(err);
			}
			return callback(null, row.albumart_sml != undefined && row.albumart_sml != '');
		}
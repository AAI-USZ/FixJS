function(err, data) {
		if(err) {
			return cb(err);
		}

		cb(null, new Cells(data));
	}
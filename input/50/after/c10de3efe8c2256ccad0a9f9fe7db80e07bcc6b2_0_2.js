function (err, info) {
			if (err) {
				return cb(err);
			}
			return cb(null, info.insertId);
		}
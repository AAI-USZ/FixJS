function (err, exists) {
		if (err)
			callback(err);
		else
			callback(exists ? 'Too soon.' : null);
	}
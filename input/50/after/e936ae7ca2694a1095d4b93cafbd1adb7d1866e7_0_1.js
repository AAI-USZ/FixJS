function (err, exists) {
		if (err)
			callback(err);
		else
			callback(exists ? Muggle('Too soon.') : null);
	}
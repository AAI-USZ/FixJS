function (err, stdout, stderr) {
		if (err)
			return callback(stderr);
		else if (stdout.match(/^APNG/))
			return callback(null, true);
		else if (stdout.match(/^PNG/))
			return callback(null, false);
		else
			return callback(stderr);
	}
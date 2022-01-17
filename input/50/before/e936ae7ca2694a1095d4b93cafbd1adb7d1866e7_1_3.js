function (err, stdout, stderr) {
		if (err) {
			winston.error(stderr);
			return callback(err);
		}
		callback(null);
	}
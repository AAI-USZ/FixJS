function (err, stdout, stderr) {
		if (err)
			return callback(Muggle('APNG detector problem.',
					stderr || err));
		else if (stdout.match(/^APNG/))
			return callback(null, true);
		else if (stdout.match(/^PNG/))
			return callback(null, false);
		else
			return callback(Muggle('APNG detector acting up.',
					stderr || err));
	}
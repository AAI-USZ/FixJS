function (err, stdout, stderr) {
			fs.unlink(tmp);
			if (err) {
				winston.error(stderr);
				return callback('Hashing error.');
			}
			var hash = stdout.trim();
			if (hash.length != 64)
				return callback('Hashing problem.');
			callback(null, hash);
		}
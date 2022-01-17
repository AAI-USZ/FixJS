function (err, stdout, stderr) {
			fs.unlink(tmp);
			if (err)
				return callback(Muggle('Hashing error.',
						stderr || err));
			var hash = stdout.trim();
			if (hash.length != 64)
				return callback(Muggle('Hashing problem.'));
			callback(null, hash);
		}
function (err, stat) {
		if (err)
			callback(Muggle('Internal filesize error.', err));
		else if (stat.size > config.IMAGE_FILESIZE_MAX)
			callback(Muggle('File is too large.'));
		else
			callback(null, stat.size);
	}
function (err, stdout, stderr) {
		if (err)
			callback(Muggle("Couldn't move file into place.",
					stderr || err));
		else
			callback(null);
	}
function (err, num) {
		if (err)
			callback(err);
		else if (num)
			callback('Duplicate of >>' + num + '.');
		else
			callback(false);
	}
function (err, num) {
		if (err)
			callback(err);
		else if (num)
			callback(Muggle('Duplicate of >>' + num + '.'));
		else
			callback(false);
	}
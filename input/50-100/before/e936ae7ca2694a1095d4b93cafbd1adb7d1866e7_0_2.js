function (err, rs) {
		if (err)
			return callback(err);
		if (rs[1] != 1)
			return callback("Image in use.");
		if (!rs[0])
			return callback("Image lost.");
		var alloc = JSON.parse(rs[0]);
		alloc.id = id;
		callback(null, alloc);
	}
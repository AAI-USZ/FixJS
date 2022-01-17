function(err, doc) {
		if (!err) {
			res.send("/users/");
		} else res.send(500, 'Error #010: '+err);
	}
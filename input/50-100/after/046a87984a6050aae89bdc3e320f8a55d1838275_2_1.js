function(err, users) {
		if (!err) {
			res.send(users);
		} else {
			res.send(500, 'Error #005: '+err);
		}
	}
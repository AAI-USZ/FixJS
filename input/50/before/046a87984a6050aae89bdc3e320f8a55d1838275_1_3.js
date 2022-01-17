function(err) {
		if (!err) {
			res.send(req.url);
		} else res.send(err);
	}
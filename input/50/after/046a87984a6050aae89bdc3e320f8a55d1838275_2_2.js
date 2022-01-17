function(err) {
		if (!err) {
			res.send(req.url);
		} else res.send(500, 'Error #007: '+err);
	}
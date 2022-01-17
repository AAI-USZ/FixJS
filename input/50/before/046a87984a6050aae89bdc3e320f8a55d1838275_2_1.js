function(err) {
		if (!err) {
			res.send(req.url + '/' + user._id);
		} else res.send(err);
	}
function(err, doc) {
		if (!err) {
			res.send(doc);
		} else res.send(404, req.url + " not found");
	}
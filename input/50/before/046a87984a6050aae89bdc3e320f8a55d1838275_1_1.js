function(err, docs) {
		if (!err) {
			res.send(docs);
		} else res.send(err);
	}
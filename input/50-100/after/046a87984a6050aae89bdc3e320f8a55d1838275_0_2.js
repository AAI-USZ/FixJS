function(err, doc) {
		if (!err) {
			res.send('/events/');
		} else res.send(500, 'Error #305: '+err);
	}
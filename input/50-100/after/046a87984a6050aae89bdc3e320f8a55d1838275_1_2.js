function(err, doc) {
		if (!err) {
			res.send('/patches/');
		} else res.send(500, 'Error #206: '+err);
	}
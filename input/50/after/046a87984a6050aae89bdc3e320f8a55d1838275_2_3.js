function(err, doc) {
		if (err) 
			res.send(500, 'Error #008: '+err);
		else if (doc == null)
			res.send(404, 'The requested user has not been found');
		else
			res.send(doc);
	}
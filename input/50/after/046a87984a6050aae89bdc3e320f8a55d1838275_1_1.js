function(err, docs) {
		if (err)
			res.send(500, 'Error #201: '+err);
		else 
			res.send(docs);
	}
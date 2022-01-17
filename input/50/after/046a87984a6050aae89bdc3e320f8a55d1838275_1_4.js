function(err, doc) {
		if (err) 
			res.send(500, 'Error #204: '+err);
		else if (doc == null)
			res.send (404, "The requested patch has not been found");
		else 
			res.send(doc);
	}
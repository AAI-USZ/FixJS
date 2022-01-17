function(err, doc) {
		if (err) 
			res.send(500, 'Error #304: '+err);
		else if (doc == null)
			res.send(404, "The requested event has not been found");
		else
			res.send(doc);

	}
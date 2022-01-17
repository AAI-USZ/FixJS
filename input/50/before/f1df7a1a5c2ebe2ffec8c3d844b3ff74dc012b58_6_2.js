function(err, doc){
		if (err){
			res.send(500);
		} else {
			res.send(doc);
		}
	}
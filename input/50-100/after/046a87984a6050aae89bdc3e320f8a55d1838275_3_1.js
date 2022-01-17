function (err, doc) {
		if(err)
			res.send(500, 'Error #104: '+err);
		else if (doc == null)
			res.send (404, 'The specified venue has not been found');
		else
			res.send(doc);
		
	}
function (err, doc) {
		if (err)
			res.send(500, 'Error #106: '+err);
		else
			res.send('/venues/');	
			
	}
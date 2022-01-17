function  (err) {
		if (err)
			res.send(500, 'Error #105: '+err);
		else
			res.send(req.url);
		
		
	}
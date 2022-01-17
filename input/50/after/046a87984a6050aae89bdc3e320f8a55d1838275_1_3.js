function(err) {
		if (err) 
			res.send(500, 'Error #203: '+err);
		else
			res.send(req.url);

	}
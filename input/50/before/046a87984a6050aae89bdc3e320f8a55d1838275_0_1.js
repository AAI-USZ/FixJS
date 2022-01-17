function(err, events){
		if (err) {
			res.send(500, err);
		}else{
			res.send(200, events);
		}
	}
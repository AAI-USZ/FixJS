function(err, events){
		if (err) {
			res.send(500, 'Error #301: '+err);
		}else{
			res.send(events);
		}
	}
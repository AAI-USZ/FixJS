function(err) {
		if (err) 
			res.send(500, 'Error #202: '+err);
		else
			res.send('/events/' + patch._id);
	}
function(err) {
		if(err)
			res.send(500, 'Error #102: '+err);
		else
			res.send('/venues/'+venue._id);
		
	}
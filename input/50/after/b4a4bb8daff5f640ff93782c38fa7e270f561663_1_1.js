function(err, req, data){
		if(err)
			return callback(err);

		callback(null, data);
	}
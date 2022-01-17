function(err, req, data){
		if(err)
			return callback(err);

		addUserToData(data, callback);
	}
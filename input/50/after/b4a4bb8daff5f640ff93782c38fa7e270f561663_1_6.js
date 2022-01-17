function(err, data){
		if(err)
			return callback(err);

		addUsersToData(data, callback);
	}
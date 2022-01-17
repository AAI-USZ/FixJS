function(err, data){
		if(err)
			callback(err);

		addUsersToData(data, callback);
	}
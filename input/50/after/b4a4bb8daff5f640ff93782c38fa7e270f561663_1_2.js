function(err, data){
		if(err)
			return callback(err);
		console.log(data.hits.total);

		addUsersToData(data, callback);
	}
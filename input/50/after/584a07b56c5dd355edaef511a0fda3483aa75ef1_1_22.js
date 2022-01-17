function(err, data){
		if(data.hits){
			addUsersToData(data, callback);
		}
		else{
			callback(undefined);
		}
	}
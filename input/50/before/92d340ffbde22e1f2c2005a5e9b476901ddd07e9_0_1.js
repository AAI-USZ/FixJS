function(err, data){
		if(data){
			addUsersToData(data, callback);
		}
		else{
			callback(err);
		}
	}
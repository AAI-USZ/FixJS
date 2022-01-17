function(err, data){
		if(data.hits.total !== 0){
			addUsersToData(data, callback);
		}
		else{
			callback(undefined);
		}
	}
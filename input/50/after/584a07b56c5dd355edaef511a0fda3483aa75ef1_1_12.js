function(err, data){
		if(data && data.hits.total !== 0) {
			addUsersToData(data, callback);
		} else { 
			callback(undefined);
		}
	}
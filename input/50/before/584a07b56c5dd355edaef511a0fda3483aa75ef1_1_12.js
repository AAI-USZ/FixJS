function(err, data){
		if(data && data.hits.total !== 0) {
			getUserObj(data, callback);
		} else { 
			callback(undefined);
		}
	}
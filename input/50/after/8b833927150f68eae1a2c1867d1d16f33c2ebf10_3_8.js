function(err, data){
		if(data.hits.total !== 0){
			callback(data.hits.hits);
		}
		else{
			callback(undefined);
		}
	}
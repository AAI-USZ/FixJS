function(err, data){
		if(data.hits.total !== 0){
			callback(data.hits.hits); //only need the hits.hits part
		}
		else{
			callback(undefined);
		}
	}
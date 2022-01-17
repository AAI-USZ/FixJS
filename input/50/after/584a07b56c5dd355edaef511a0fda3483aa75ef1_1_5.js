function(err, data){
		if(data.hits.total !== 0){
			callback(null, data.hits.hits); //only need the hits.hits part
		}
		else{
			callback(err);
		}
	}
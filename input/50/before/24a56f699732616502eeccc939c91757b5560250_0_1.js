function(err, data){
		if(data.hits){
			callback(null, parseInt(data.hits.total));
		}
		else{
			callback(err);
		}
	}
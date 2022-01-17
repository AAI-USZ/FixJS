function(err, data){
		if(data){
			callback(null, parseInt(data.hits.total));
		}
		else{
			callback(err);
		}
	}
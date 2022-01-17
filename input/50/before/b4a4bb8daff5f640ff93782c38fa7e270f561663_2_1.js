function(err, result){
		if(result){
			callback(null, result);
		}else{
			callback(err);
		}
	}
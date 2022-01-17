function(err){
		if(err){
			callback(err, null);
		}else{
			callback(null, questions);
		}
	}
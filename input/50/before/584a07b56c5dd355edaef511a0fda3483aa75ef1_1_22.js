function(err, data){
		if(data.hits){
			getUserObj(data, callback);
		}
		else{
			callback(undefined);
		}
	}
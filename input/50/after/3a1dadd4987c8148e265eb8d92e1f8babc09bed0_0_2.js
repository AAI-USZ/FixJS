function(err, data){
		if(data) {
			getUserObj(data, callback);
		} else {
			callback(undefined);
		}
	}
function(err, data){
		if(data) {
			callback(data.hits);
		} else {
			callback(undefined);
		}
	}
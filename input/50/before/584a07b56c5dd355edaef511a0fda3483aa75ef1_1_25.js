function(err, req, data){
		if (data) {
			callback(data);
		}
		else {
			callback(undefined);
		}
	}
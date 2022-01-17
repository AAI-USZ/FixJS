function(err, req, data){
		if (data) {
			callback(err, data);
		}else {
			callback(err);
		}
	}
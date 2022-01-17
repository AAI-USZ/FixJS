function(err, req, data){
		if (data) {
			callback(null, data);
		}else {
			callback(err);
		}
	}
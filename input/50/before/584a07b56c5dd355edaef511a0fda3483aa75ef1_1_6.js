function(err, req, data){
		if (data) {
			callback(data._source);
		}else{
			callback(undefined);
		}
	}
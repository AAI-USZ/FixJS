function(err, req, data){
		if (data) {
			addUserToData(data, callback);
		}else{
			callback(err);
		}
	}
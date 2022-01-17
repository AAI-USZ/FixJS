function(err, data){
		if(data.hits.total !== 0){
			callback(data.hits);
		}
		else{
			console.log("Specified target_uuid does not contain any comments");
		}
	}
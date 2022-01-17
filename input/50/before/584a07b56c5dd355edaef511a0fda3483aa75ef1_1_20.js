function(err, data){
		if(data.hits.total !== 0){
			getUserObj(data, callback);
		}
		else{
			//console.log("Specified target_uuid does not contain any comments");
			callback(undefined);
		}
	}
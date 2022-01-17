function(err, data){
		if(data.hits.total !== 0){
			getUserObj(data, callback);
		}
		else{
			callback(undefined);
			console.log("User did not post any comments");
		}
	}
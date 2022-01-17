function(err, data){
		if(data.hits.total !== 0){
			callback(data.hits);
		}
		else{
			callback(data); // not yet
			//console.log("User did not post any comments");
		}
	}
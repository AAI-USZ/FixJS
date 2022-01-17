function(err, data){
		if(err){
			callback(null, err);
			return;
		} 
		callback(ejs.render(data, view));
	}
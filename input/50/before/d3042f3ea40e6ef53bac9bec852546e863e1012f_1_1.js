function(err, data){
		if(err) throw err;
		callback(ejs.render(data, view));
	}
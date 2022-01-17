function (err, doc) {
		if(!err){
			res.send(req.url.substring(0, req.url.length-_id.length-1));	
		}	
	}
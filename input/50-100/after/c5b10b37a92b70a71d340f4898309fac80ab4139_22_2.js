function(req, httpRes){
		//httpRes.redirect(schemaUrl)
	//	httpRes.send(
		var json = JSON.stringify(schemaUrl)
		var data = new Buffer(json)
		httpRes.setHeader('Content-Type', 'application/json');
		httpRes.setHeader('Content-Length', data.length);
		httpRes.end(data)
	}
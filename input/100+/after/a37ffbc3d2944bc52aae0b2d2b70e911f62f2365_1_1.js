function(){
		try {
			data = JSON.parse(data);
		} catch (e) {
			util.log('could not parse json: "' + data + '"');
			req.res.writeHead(503, {'content-type':'application/json'});
			return req.res.end(JSON.stringify({message:'could not parse your data'}));
		}
		engine.updateUserLocation(getUser(data.userName), new BGTLocation({lat: data.latitude, lon: data.longitude}));
		req.res.writeHead(200, {'content-type':'application/json'});
		req.res.end(JSON.stringify({message:'OK'}));
	}
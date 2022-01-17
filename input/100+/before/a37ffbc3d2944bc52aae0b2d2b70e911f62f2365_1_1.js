function(){
		try {
			data = JSON.parse(data);
		} catch (e) {
			util.log('could not parse json: "' + data + '"');
			req.res.writeHead(503);
			return req.res.end('could not parse your data');
		}
		engine.updateUserLocation(getUser(data.userName), {lat: data.latitude, lon: data.longitude});
		req.res.end('OK');
	}
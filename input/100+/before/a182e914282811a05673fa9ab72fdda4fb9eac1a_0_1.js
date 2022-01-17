function (route, method, data, callback) {
		console.log('Creating "%s" Request to "%s"', method, route);

		if(typeof route == 'undefined')
			throw noRouteGiven;

		var requestOptions = {
			uri: nodeGauges.apiBase + route,
			headers: {
				"X-Gauges-Token":this.apiKey,
			},
		}

		if(typeof method == 'undefined')
			requestOptions.method = "GET";
		else
			requestOptions.method = method;

		if(data)
			requestOptions.form = data;


		request(requestOptions, function(err, responce, body) {
			if (err) {
				callback(err, body, responce);
			} else {
				if(typeof body.status !== 'undefined') {
					callback(body.message, body, responce);
				} else {
					callback(null, body, responce);
				}
			}
		});
	}
function (error, response, body) {
			if (!error && response.statusCode === 200) {
				callback(null, body);
			}
			else {
				log("error getting JSON from %s: error: %s, statusCode: %s", url, error, response.statusCode);
				callback(response.statusCode);
			}
		}
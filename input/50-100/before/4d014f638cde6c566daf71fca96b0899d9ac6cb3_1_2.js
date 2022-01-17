function (error, response, body) {
			if (!error && response.statusCode === 200) {
				// console.log(JSON.stringify(body));
				callback(body);
			}
			else {
				log("error getting JSON from %s: error: %s, statusCode: %s", url, error, response.statusCode);
				callback(null, response.statusCode);
			}
		}
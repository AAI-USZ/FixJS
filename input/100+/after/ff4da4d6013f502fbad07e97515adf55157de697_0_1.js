function(options, cbResult, cbRequest) {
	var o1 = this;

	options.headers = options.headers || {};
	options.headers['X-Auth-Token'] = o1.config.authToken;

	// Create the request object
	var req1 = request(options, function(err, res, body) {
		if (err) {
			return cbResult(err);
		}

		// Unauthorized
		if (res.statusCode === 401) {
			// Attempt to re-authorize
			o1._authenticate(function(err) {
				if (err) {
					return cbResult(err);
				}

				// Reauthorized, so run request again
				o1._cloudRequest(options, cbResult, cbRequest);
			});
			return;
		}

		// Problem
		if (!o1.hGoodStatuses.hasOwnProperty(res.statusCode)) {
			o1._log('request failed');
			return cbResult(new Error('Error code ' + res.statusCode));
		}

		// Everything went fine
		if (cbResult) {
			cbResult(null, res, body);
		}
	});
	// Return the requets object to the callback so that data may be piped
	if (cbRequest) {
		cbRequest(req1);
	}
}
function(payload, callback) {
	// Check that the payload is either a buffer or a string

	var options = {
		uri: this._target,
		method: 'PUT',
		body: payload,
		headers: {
			'Authorization': generateAuthHeader()
		},
		timeout: 20000
	};

	makeRequest(options, callback)
}
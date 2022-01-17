function(payload) {
	// Check that the payload is either a buffer or a string

	var options = {
		uri: this._target,
		method: 'PUT',
		body: payload,
		headers: {
			'Authorization': generateAuthHeader(this._target, this._req)
		},
		timeout: 20000
	};

	makeRequest(options, this._callback)
}
function(payload, callback) {
	// Check that the payload is either a buffer or a string

	var options = {
		uri: this._target,
		method: 'POST',
		body: payload,
		headers: {
			'Authorization': this.generateAuthHeader()
		},
		timeout: 20000
	};

	makeRequest(options, callback)
}
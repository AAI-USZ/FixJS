function() {
	var options = {
		uri: this._target,
		method: 'GET',
		headers: {
			'Authorization': generateAuthHeader(this._target, this._req)
		},
		timeout: 20000
	};

	makeRequest(options, this._callback)
}
function() {
	var options = {
		uri: this._target,
		method: 'DELETE',
		headers: {
			'Authorization': generateAuthHeader(this._target, this._req)
		},
		timeout: 20000
	};

	makeRequest(options, this._callback)
}
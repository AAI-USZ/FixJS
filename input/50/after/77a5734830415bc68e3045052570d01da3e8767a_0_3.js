function(callback) {
	var options = {
		uri: this._target,
		method: 'DELETE',
		headers: {
			'Authorization': generateAuthHeader()
		},
		timeout: 20000
	};

	makeRequest(options, callback)
}
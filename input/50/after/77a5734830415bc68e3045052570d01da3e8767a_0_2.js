function(callback) {
	var options = {
		uri: this._target,
		method: 'GET',
		headers: {
			'Authorization': this.generateAuthHeader()
		},
		timeout: 20000
	};

	makeRequest(options, callback)
}
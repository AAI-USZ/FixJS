function() {
		var path = url.parse(mockOptions.storage).pathname;
		var scope = nock(mockOptions.storage).post(path).matchHeader('X-Account-Meta-Temp-Url-Key', mockOptions.tempURLKey).reply(204, 'No Content');

		this.aScopes.push(scope);
		return this;
	}
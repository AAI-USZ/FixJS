function() {
		var storage = url.parse(mockOptions.storage);
		var scope = nock(storage.href).get(storage.path).matchHeader('X-Account-Meta-Temp-Url-Key', mockOptions.tempURLKey).reply(204, 'No Content');

		this.aScopes.push(scope);
		return this;
	}
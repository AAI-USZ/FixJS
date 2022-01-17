function() {
		// Setup nock to respond to a good auth request, twice
		var path = url.parse(clientOptions.baseURI).pathname;
		var scope = nock(clientOptions.baseURI).get(path).matchHeader('X-Auth-User', mockOptions.user).matchHeader('X-Auth-Key', mockOptions.key).reply(204, 'No Content', {
			'x-storage-url' : mockOptions.storage,
			'x-cdn-management-url' : mockOptions.cdn,
			'x-auth-token' : mockOptions.token
		});

		this.aScopes.push(scope);
		return this;
	}
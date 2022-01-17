function() {

		var aContainers = [{
			name : 'one',
			count : 2,
			bytes : 12
		}, {
			name : 'two',
			count : 3,
			bytes : 12
		}, {
			name : 'three',
			count : 3,
			bytes : 12
		}];

		var storage = url.parse(mockOptions.storage);
		var scope = nock(storage.href).get(storage.path + '?format=json').matchHeader('X-Auth-Token', mockOptions.token).reply(200, JSON.stringify(aContainers));

		this.aScopes.push(scope);
		return this;
	}
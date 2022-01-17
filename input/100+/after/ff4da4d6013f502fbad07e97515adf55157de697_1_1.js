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

		var path = url.parse(mockOptions.storage).pathname + '?format=json';
		var scope = nock(mockOptions.storage).get(path).matchHeader('X-Auth-Token', mockOptions.token).reply(200, JSON.stringify(aContainers));

		this.aScopes.push(scope);
		return this;
	}
function() {
		var aContainers = [{
			name : 'one',
			cdn_enabled : true,
			ttl : 28800,
			log_retention : false,
			cdn_uri : 'http://c2.r2.cf1.rackcdn.com',
			cdn_ssl_uri : 'https://c2.ssl.cf1.rackcdn.com',
			cdn_streaming_uri : 'https://c2.r2.stream.cf1.rackcdn.com'
		}, {
			name : 'two',
			cdn_enabled : true,
			ttl : 28800,
			log_retention : false,
			cdn_uri : 'http://c2.r2.cf1.rackcdn.com',
			cdn_ssl_uri : 'https://c2.ssl.cf1.rackcdn.com',
			cdn_streaming_uri : 'https://c2.r2.stream.cf1.rackcdn.com'
		}];

		var path = url.parse(mockOptions.cdn).pathname + '?format=json';
		var scope = nock(mockOptions.cdn).get(path).matchHeader('X-Auth-Token', mockOptions.token).reply(200, JSON.stringify(aContainers));

		this.aScopes.push(scope);
		return this;
	}
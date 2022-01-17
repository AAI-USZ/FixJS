function (done) {
			var client = basicAuth(
				function (request) { return { request: request }; },
				{ username: 'user', password: 'pass'}
			);
			client({}).then(
				function (response) {
					assert.equals('dXNlcjpwYXNz', response.request.headers.Authorization);
					done();
				}
			);
		}
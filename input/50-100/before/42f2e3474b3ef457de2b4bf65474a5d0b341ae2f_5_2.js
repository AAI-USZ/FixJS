function (done) {
			var client = basicAuth(
				function (request) { return { request: request }; }
			);
			client({ username: 'user', password: 'pass'}).then(
				function (response) {
					assert.equals('dXNlcjpwYXNz', response.request.headers.Authorization);
					done();
				}
			);
		}
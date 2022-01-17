function (done) {
			var client;

			client = oAuth(
				function (request) { return { request: request, status: { code: 200 } }; },
				{ token: 'bearer abcxyz' }
			);

			client({}).then(
				function (response) {
					assert.equals('bearer abcxyz', response.request.headers.Authorization);
					done();
				}
			);
		}
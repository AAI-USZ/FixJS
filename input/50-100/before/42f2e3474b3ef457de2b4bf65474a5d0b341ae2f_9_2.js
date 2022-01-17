function (done) {
			var client;

			client = mime(
				function (request) {
					return { request: request, headers: {} };
				},
				{ mime: 'application/json' }
			);

			client({ entity: {} }).then(
				function (response) {
					assert.equals('{}', response.request.entity);
					done();
				}
			);
		}
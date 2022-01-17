function (done) {
			var client = pathPrefix(
				function (request) { return { request: request }; },
				{ prefix: '/foo' }
			);
			client({ path: 'bar' }).then(
				function (response) {
					assert.equals('/foo/bar', response.request.path);
					done();
				}
			);
		}
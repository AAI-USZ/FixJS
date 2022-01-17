function (done) {
			var store = new RestStore({ client: client });
			store.put({ foo: 'bar', id: 42 }).then(
				function (response) {
					assert.equals('42', response.request.path);
					assert.equals('put', response.request.method);
					refute(response.request.headers['If-None-Match']);
					refute(response.request.headers['If-Match']);
				}
			).always(done);
		}
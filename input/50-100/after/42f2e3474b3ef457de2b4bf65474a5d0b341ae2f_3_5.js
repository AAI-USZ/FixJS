function (done) {
			var store = new RestStore({ client: client });
			store.put({ foo: 'bar', id: 42 }, { overwrite: false }).then(
				function (response) {
					assert.equals('42', response.request.path);
					assert.equals('put', response.request.method);
					assert.equals('*', response.request.headers['If-None-Match']);
				}
			).always(done);
		}
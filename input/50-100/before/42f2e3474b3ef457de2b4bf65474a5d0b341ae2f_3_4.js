function (done) {
			var store = new RestStore({ client: client });
			when(store.put({ foo: 'bar', id: 42 }, { overwrite: false }), function (response) {
				assert.equals('42', response.request.path);
				assert.equals('put', response.request.method);
				assert.equals('*', response.request.headers['If-None-Match']);
				done();
			});
		}
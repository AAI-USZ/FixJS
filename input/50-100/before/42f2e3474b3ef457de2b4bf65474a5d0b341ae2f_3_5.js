function (done) {
			var store = new RestStore({ client: client });
			when(store.put({ foo: 'bar', id: 42 }), function (response) {
				assert.equals('42', response.request.path);
				assert.equals('put', response.request.method);
				refute(response.request.headers['If-None-Match']);
				refute(response.request.headers['If-Match']);
				done();
			});
		}
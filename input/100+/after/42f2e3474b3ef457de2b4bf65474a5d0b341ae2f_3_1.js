function (done) {
			var store = new RestStore({ client: client });
			store.add({ foo: 'bar' }).then(
				function (response) {
					assert.equals('', response.request.path);
					assert.equals('post', response.request.method);
					assert.equals('*', response.request.headers['If-None-Match']);
					assert.equals('bar', response.request.entity.foo);
				}
			).always(done);
		}
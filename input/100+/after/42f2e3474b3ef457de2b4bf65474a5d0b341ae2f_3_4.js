function (done) {
			var store = new RestStore({ client: client, ignoreId: true });
			store.add({ foo: 'bar', id: 42 }).then(
				function (response) {
					assert.equals('', response.request.path);
					assert.equals('post', response.request.method);
					assert.equals('*', response.request.headers['If-None-Match']);
					assert.equals('bar', response.request.entity.foo);
					assert.equals('42', response.request.entity.id);
				}
			).always(done);
		}
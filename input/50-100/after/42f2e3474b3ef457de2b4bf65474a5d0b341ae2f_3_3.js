function (done) {
			var store = new RestStore({ client: client });
			store.remove(42).then(
				function (response) {
					assert.equals('42', response.request.path);
					assert.equals('delete', response.request.method);
				}
			).always(done);
		}
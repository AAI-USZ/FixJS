function (done) {
			var store = new RestStore({ client: client });
			store.get(42).then(
				function (response) {
					assert.equals('42', response.request.path);
					refute(response.request.method);
				}
			).always(done);
		}
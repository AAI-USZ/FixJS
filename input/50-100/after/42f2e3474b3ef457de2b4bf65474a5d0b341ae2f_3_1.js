function (done) {
			var store = new RestStore({ client: client });
			store.query({ q: 'what is the meaning of life?' }).then(
				function (response) {
					assert.equals('what is the meaning of life?', response.request.params.q);
				}
			).always(done);
		}
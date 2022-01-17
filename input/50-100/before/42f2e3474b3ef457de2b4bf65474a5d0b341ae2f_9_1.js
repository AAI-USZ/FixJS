function (done) {
			var client;

			client = mime(function () {
				return { entity: '{}', headers: { 'Content-Type': 'application/json' } };
			});

			client({}).then(
				function (response) {
					assert.equals({}, response.entity);
					done();
				}
			);
		}
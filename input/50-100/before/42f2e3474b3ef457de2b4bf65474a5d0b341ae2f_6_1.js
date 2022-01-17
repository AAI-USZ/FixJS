function (done) {
			var client, body;

			body = {};
			client = entity(function () { return { entity: body }; });

			client().then(
				function (response) {
					assert.same(body, response);
					done();
				}
			);
		}
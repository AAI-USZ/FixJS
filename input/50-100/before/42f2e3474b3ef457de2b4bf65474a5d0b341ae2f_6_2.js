function (done) {
			var client, response;

			response = {};
			client = entity(function () { return response; });

			client().then(
				function (r) {
					assert.same(response, r);
					done();
				}
			);
		}
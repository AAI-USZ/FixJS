function (spec) {
				when(spec.client({}),
					function (response) {
						assert.isString(response);
						done();
					},
					never(done())
				);
			}
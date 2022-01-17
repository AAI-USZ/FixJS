function (spec) {
				when(spec.client({}),
					function (response) {
						assert.equals('bar', response.foo);
						done();
					},
					never(done)
				);
			}
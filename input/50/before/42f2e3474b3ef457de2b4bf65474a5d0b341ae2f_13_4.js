function (spec) {
				when(spec.client({}),
					function (response) {
						assert.equals('bar', response.entity.foo);
						done();
					},
					never(done())
				);
			}
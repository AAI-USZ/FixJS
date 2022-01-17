function (spec) {
				when(spec.client({}),
					never(done()),
					function (response) {
						assert.equals('bar', response.entity.foo);
						done();
					}
				);
			}
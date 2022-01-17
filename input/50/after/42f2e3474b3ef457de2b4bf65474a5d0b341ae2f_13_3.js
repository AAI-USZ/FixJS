function (spec) {
				spec.client({}).then(
					undefined,
					function (response) {
						assert.equals('bar', response.entity.foo);
					}
				);
			}
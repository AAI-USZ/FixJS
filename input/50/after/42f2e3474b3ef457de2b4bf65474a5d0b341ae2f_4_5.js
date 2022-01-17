function (spec) {
				spec.client({}).then(
					function (response) {
						assert.equals('bar', response.foo);
					}
				);
			}
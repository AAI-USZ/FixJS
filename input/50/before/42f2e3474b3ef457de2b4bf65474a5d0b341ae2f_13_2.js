function (response) {
						assert.equals('bar', response.entity.foo);
						done();
					}
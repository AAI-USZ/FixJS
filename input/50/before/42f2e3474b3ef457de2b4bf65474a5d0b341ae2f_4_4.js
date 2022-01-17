function (response) {
						assert.equals('bar', response.foo);
						done();
					}
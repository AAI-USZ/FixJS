function (response) {
					assert.equals('path/to/somewhere', response.request.path);
					assert.equals('text/plain', response.request.headers.Accept);
					assert.equals('bar', response.entity.foo);
				}
function (resource) {
					assert.equals('bar', resource.entity.foo);
					assert.equals('test/dojo/hello.json', resource.request.path);
				}
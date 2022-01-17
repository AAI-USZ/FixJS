function (spec) {
				assert.equals('bar', spec.resource.entity.foo);
				assert.equals('test/dojo/hello.json', spec.resource.request.path);
				done();
			}
function (response) {
				assert.equals('', response.request.path);
				assert.equals('post', response.request.method);
				assert.equals('*', response.request.headers['If-None-Match']);
				assert.equals('bar', response.request.entity.foo);
				done();
			}
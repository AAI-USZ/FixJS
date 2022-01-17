function (response) {
				assert.equals('42', response.request.path);
				assert.equals('put', response.request.method);
				assert.equals('*', response.request.headers['If-None-Match']);
				assert.equals('bar', response.request.entity.foo);
				refute.equals('42', response.request.entity.id);
				done();
			}
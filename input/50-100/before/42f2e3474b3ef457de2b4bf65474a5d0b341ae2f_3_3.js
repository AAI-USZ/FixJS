function (response) {
				assert.equals('42', response.request.path);
				assert.equals('delete', response.request.method);
				done();
			}
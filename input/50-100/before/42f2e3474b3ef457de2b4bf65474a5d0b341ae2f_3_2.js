function (response) {
				assert.equals('42', response.request.path);
				refute(response.request.method);
				done();
			}
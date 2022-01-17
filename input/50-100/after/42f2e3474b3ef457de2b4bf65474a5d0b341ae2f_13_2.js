function (response) {
					assert.equals('{"bleep":"bloop"}', response.request.entity);
					assert.equals(0, response.request.headers.Accept.indexOf('application/json'));
					assert.equals('application/json', response.request.headers['Content-Type']);
				}
function (response) {
				assert(response.raw);
				assert.same(request, response.request);
				assert.equals(response.entity, 'hello world');
				assert.equals(response.status.code, 200);
				assert.equals('text/plain', response.headers['Content-Type']);
				assert.equals(response.entity.length, parseInt(response.headers['Content-Length'], 10));
			}
function (response) {
					var xhr, name;
					xhr = response.raw;
					assert.same(request, response.request);
					assert.equals(xhr.responseText, response.entity);
					assert.equals(xhr.status, response.status.code);
					assert.equals(xhr.statusText, response.status.text);
					for (name in response.headers) {
						assert.equals(xhr.getResponseHeader(name), response.headers[name]);
					}
				}
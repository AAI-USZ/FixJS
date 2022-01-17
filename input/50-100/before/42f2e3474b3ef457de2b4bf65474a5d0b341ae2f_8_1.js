function () {
			var client = jsonp(
				function (request) { return { request: request }; },
				{ callback: { param: 'callback', prefix: 'jsonp' } }
			);
			when(client({})).then(
				function (response) {
					assert.equals('callback', response.request.callback.param);
					assert.equals('jsonp', response.request.callback.prefix);
				}
			);
		}
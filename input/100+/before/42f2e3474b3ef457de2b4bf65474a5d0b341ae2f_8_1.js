function () {
			var client = jsonp(
				function (request) { return { request: request }; },
				{ callback: { param: 'callback', prefix: 'jsonp' } }
			);
			when(client({ callback: { param: 'customCallback', prefix: 'customPrefix' } })).then(
				function (response) {
					assert.equals('customCallback', response.request.callback.param);
					assert.equals('customPrefix', response.request.callback.prefix);
				}
			);
		}
function (done) {
			var client = jsonp(
				function (request) { return when({ request: request }); },
				{ callback: { param: 'callback', prefix: 'jsonp' } }
			);
			client({ callback: { param: 'customCallback', prefix: 'customPrefix' } }).then(
				function (response) {
					assert.equals('customCallback', response.request.callback.param);
					assert.equals('customPrefix', response.request.callback.prefix);
				}
			).always(done);
		}
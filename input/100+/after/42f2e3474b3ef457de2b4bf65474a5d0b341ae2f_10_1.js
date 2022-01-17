function (response) {
				assert.equals('bearer abcxyz', response.request.headers.Authorization);
				assert.called(windowStrategyClose);
			}
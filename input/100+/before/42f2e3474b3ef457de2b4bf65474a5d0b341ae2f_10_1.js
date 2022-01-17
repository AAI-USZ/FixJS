function (done) {
			var client, windowStrategy, windowStrategyClose, oAuthCallbackName;

			oAuthCallbackName = 'oAuthCallback' + Math.round(Math.random() * 100000);
			windowStrategyClose = this.spy(function () {});
			windowStrategy = function (url) {
				var state;
				assert(url.indexOf('https://www.example.com/auth?response_type=token&redirect_uri=http%3A%2F%2Flocalhost%2FimplicitHandler&client_id=user&scope=openid&state=') === 0);
				state = url.substring(url.lastIndexOf('=') + 1);
				setTimeout(function () {
					global[oAuthCallbackName]('#state=' + state + '&=token_type=bearer&access_token=abcxyz');
				}, 10);
				return windowStrategyClose;
			};

			client = oAuth(
				function (request) {
					return { request: request, status: { code: 200 } };
				},
				{
					clientId: 'user',
					authorizationUrlBase: 'https://www.example.com/auth',
					redirectUrl: 'http://localhost/implicitHandler',
					scope: 'openid',
					windowStrategy: windowStrategy,
					oAuthCallbackName: oAuthCallbackName
				}
			);

			client({}).then(
				function (response) {
					assert.equals('bearer abcxyz', response.request.headers.Authorization);
					assert.called(windowStrategyClose);
					done();
				}
			);
		}
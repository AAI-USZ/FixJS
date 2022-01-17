function () {
			if (!completed) {
				completed = true;
				if (context.callback) {

					var setDataOnResult = function (result) {
						result.headers = res.headers;
						result.statusCode = res.statusCode;
						result.newAccessToken = context.newAccessToken;
					};

					if (res.statusCode === 200 && res.headers['x-wns-notificationstatus'] === 'received') {
						
						// success

						var result = {};
						setDataOnResult(result);
						try {
							context.callback(null, result);
						}
						catch (e) {
							// empty
						}
					}
					else if (res.statusCode === 401 && !context.newAccessToken) {
						
						// accessToken may have expired - try once to obtain a new one

						obtainAccessToken(context);
					}
					else {

						// failure

						var result = new Error(responseCodes[res.statusCode] 
							|| ('Windows Notification Service returned HTTP status code ' + res.statusCode
								+ ' with x-wns-notificationstatus value of ' + res.headers['x-wns-notificationstatus']));
						setDataOnResult(result);
						try {
							context.callback(result);
						}
						catch (e) {
							// empty
						}
					}
				}
			}
		}
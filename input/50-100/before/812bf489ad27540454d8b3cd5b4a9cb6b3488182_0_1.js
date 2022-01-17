function(err, response, body) {
				if (err) {
					deferred.reject(err);
					return;
				}

				// Resolve cached promise
				deferred.resolve(response.request.uri.href);
			}
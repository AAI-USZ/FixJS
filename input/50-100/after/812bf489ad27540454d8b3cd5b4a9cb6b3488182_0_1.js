function(err, response, body) {
				if (err) {
					// Reject cached promise
					deferred.reject(err);

					// Clear the cache
					cache.set(username, size, null);
					
					return;
				}

				var url = response.request.uri.href;

				// Resolve cached promise
				deferred.resolve(url);

				// Replace cache entry with final value
				cache.set(username, size, url);
			}
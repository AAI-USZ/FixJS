function(name, size, callback) {
	var usernames = Array.isArray(name) ? name : [name];
	callback = typeof size === 'function' ? size : callback;
	size = typeof size === 'string' ? sizes[size] || sizes[defaultSize] : sizes[defaultSize];

	var promises = [];

	usernames.forEach(function(username) {
		var cachedPromise = cache.get(username, size);

		if (cachedPromise) {
			promises.push(cachedPromise);
		} else {
			var deferred = q.defer(),
				promise = deferred.promise;

			// Place promise in cache
			cache.set(username, size, promise);
			promises.push(promise);

			request('http://api.twitter.com/1/users/profile_image/' + username + '?size=' + size, function(err, response, body) {
				if (err) {
					deferred.reject(err);
					return;
				}

				// Resolve cached promise
				deferred.resolve(response.request.uri.href);
			});
		}
	});

	q.when(q.all(promises)).then(function(urls) {
		callback(null, urls.length > 1 ? urls : urls[0]);
	}, function(err) {
		callback(err, null);
	});
}
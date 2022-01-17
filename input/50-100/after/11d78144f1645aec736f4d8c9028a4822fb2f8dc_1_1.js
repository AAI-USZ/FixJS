function(resolverName, name, options) {
			var deferred, resolver;

			deferred = when.defer();

			if (resolverName) {
				resolver = this._resolvers[resolverName];

				if (resolver) {
					resolver(deferred.resolver, name, options||{}, this._pluginApi);
				} else {
					deferred.reject('No resolver plugin found: ' + resolverName);
				}

			} else {
				deferred.reject('Cannot resolve ref: ' + name);
			}

			return deferred.promise;
		}
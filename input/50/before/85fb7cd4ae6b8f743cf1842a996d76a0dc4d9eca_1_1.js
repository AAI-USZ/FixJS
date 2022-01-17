function resolved (resource) {
				// return the resource to the callback
				if (typeof callback.resolve == 'function') {
					// promise-like callback
					callback.resolve(resource);
				}
				else {
					// just a function
					callback(resource);
				}
			}
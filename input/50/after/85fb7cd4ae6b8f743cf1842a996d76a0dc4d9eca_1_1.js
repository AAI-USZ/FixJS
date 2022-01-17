function rejected (error) {
				// report that an error happened
				if (typeof callback.error == 'function') {
					// promise-like callback
					callback.error(error);
				}
				// no way to report errors if the callback doesn't have error()
			}
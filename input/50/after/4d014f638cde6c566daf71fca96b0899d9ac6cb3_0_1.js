function(error, value) {
			self.processAsyncMethodCallback(error, value);

			if (!error) {
				callback(null, self.options.cachedValue);
			}
			else {
				callback(error);
			}
		}
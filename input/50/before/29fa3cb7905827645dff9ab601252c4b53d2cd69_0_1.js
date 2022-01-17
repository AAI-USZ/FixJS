function(value, error) {
			self.processAsyncMethodCallback(value, error);

			if (!error) {
				callback(self.options.cachedValue);
			}
			else {
				callback(null, error);
			}
		}
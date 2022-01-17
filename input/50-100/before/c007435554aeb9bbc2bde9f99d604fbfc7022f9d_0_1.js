function(err, result) {
			self._numberOfServersLeftToInitialize = self._numberOfServersLeftToInitialize - 1;

			if(self._numberOfServersLeftToInitialize == 0) {
				// Start ha function if it exists
				if(self.haEnabled) {
					// Setup the ha process
					self._replicasetTimeoutId = setTimeout(self.mongosCheckFunction, self.mongosStatusCheckInterval);
				}

				// Set the mongos to connected
				self._serverState = "connected";
				// Callback
				callback(null, null);
			}
		}
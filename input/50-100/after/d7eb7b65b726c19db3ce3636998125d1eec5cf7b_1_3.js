function() {
			timeElapsed += timeout;
			if (timeElapsed == maxWaitingTimeout) {
				self._cleanupErrorHandlers();
				if (!self.liveUpdates && self.requestType === "initial") {
					self._initLiveUpdates();
				}
				errorCallback(
					$.extend(data, {
						"requestType": self.requestType,
						"retryTimeout": timeout,
						"critical": false
					})
				);
				self._startLiveUpdates();
			}
		}
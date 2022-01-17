function() {
			timeElapsed += timeout;
			if (timeElapsed == maxWaitingTimeout) {
				self._cleanupErrorHandlers();
				if (config.waitingHandler) {
					config.waitingHandler();
				}
			} else {
				self.transport.abort();
				self.config.get("onError")(data);
			}
		}
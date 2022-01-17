function(response, requestParams) {
			_config.onOpen.call(self, response, {"requestType": self.requestType});
			clearInterval(self.retryTimer);
			delete self.retryTimer;
		}
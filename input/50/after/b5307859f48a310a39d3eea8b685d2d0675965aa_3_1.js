function(data, options) {
				if (options.requestType === "initial") {
					self.showError({}, {
						"retryIn": 0,
						"request": self.request
					});
				}
			}
function(response) {
			self.onData(response);
			self.config.get("onData")(response);
		}
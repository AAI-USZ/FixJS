function(text) {
			self.onError(text);
			self.config.get("onError")(text);
		}
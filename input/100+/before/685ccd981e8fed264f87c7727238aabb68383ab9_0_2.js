function() {
	var self = this;
	var ajaxSettings = {
		url: this.config.get("url"),
		type: this.config.get("method"),
		error: function(text) {
			self.onError(text);
			self.config.get("onError")(text);
		},
		success: function(response) {
			self.onData(response);
			self.config.get("onData")(response);
		},
		beforeSend: this.config.get("onOpen"),
		dataType: "json"
	};
	if ("XDomainRequest" in window && window.XDomainRequest != null) {
		ajaxSettings.xhr = function() {
			return new XDomainRequest();
		};
	}
	return ajaxSettings;
}
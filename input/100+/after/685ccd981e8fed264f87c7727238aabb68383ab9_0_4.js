function() {
	var userDefinedTransport = this.config.get("transport").toUpperCase();
	var transport = Echo.API.Transports[userDefinedTransport] && Echo.API.Transports[userDefinedTransport].available()
		? userDefinedTransport
		: utils.foldl("", Echo.API.Transports, function(constructor, acc, name) {
			var available = Echo.API.Transports[name].available();
			if (available) {
				return name;
			}
		});
	return new Echo.API.Transports[transport](
		$.extend(this._getHandlersByConfig(), {
			"url": this._prepareURL(),
			"data": this.config.get("data")
		})
	);
}
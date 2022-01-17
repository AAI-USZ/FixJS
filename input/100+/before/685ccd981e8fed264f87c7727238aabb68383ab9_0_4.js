function() {
	var userDefinedTransport = this.config.get("transport");
	var transport = utils.foldl("", Echo.API.Transports, function(constructor, acc, name) {
		var available = Echo.API.Transports[name].available();
		if (userDefinedTransport === name.toLowerCase() && available) {
			return name;
		} else if (available) {
			acc = name;
		}
	});
	return new Echo.API.Transports[transport](
		$.extend(this._getHandlersByConfig(), {
			"url": this._prepareURL(),
			"data": this.config.get("data")
		})
	);
}
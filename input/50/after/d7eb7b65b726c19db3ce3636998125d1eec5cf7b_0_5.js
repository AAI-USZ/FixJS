function() {
	if (this.jxhrTransportObject) {
		this.jxhrTransportObject.abort();
	}
	this.config.get("onClose")();
}
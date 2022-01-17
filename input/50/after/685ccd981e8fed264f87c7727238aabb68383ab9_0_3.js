function() {
	if (this.jxhrInstance) {
		this.jxhrInstance.abort();
	}
	this.config.get("onClose")();
}
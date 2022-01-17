function() {
	if (this.config.get("endpoint") === "submit") {
		return this.config.get("submissionProxyURL");
	}
	return this.constructor.parent._prepareURI.call(this);
}
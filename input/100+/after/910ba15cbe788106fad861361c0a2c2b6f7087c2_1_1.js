function() {
	if (this.config.get("endpoint") === "submit") {
		return this.transport._getScheme() + this.config.get("submissionProxyURL");
	}
	return this.constructor.parent._prepareURL.call(this);
}
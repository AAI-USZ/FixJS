function(config) {
	var scheme = this.config.get("secure") ? "https:" : window.location.protocol;
	return scheme + "//" + this.config.get("apiBaseURL") + this.config.get("endpoint");
}
function() {
	return this.config.get("secure") ? "https:" : window.location.protocol;
}
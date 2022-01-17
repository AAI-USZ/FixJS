function() {
	return this.config.get("secure") ? "wss:" : "ws:";
}
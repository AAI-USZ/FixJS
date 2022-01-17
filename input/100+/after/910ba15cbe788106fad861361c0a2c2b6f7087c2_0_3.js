function() {
	return this.confug.get("secure") ? "wss:" : "ws:";
}
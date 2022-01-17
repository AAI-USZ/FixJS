function(callback) {
	var control = this;
	return Echo.UserSession({
		"appkey": this.config.get("appkey"),
		"ready": $.proxy(callback, control)
	});
}
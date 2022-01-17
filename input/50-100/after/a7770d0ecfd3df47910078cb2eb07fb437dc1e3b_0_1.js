function(callback) {
	var control = this;
	Echo.UserSession({
		"appkey": this.config.get("appkey"),
		"ready": function() {
			control.user = this;
			callback.call(control);
		}
	});
}
function(errorCode, notification) {
	debug("Raising error:", errorCode, notification);
	if (typeof this.options.errorCallback == 'function') {
		this.options.errorCallback(errorCode, notification);
	}
}
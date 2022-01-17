function(errorCode, notification) {
	debug("Raising error: %d", errorCode, notification);
	if (typeof this.options.errorCallback == 'function') {
		this.options.errorCallback(errorCode, notification);
	}
}
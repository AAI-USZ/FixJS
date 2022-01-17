function(successResponseReceived) {
	if (successResponseReceived) {
		this.waitingTimeoutStep = 0;
		delete this.error;
	}
	if (this.waitingTimer) {
		clearInterval(this.waitingTimer);
	}
}
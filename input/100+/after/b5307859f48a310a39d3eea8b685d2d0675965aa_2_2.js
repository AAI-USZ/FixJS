function(data, config) {
	var self = this;
	config = config || {};
	var errorCallback = config.callback;
	var calcWaitingTimeout = function() {
		// interval is calculated as x^2, x=[1..7]
		if (self.waitingTimeoutStep > 0) {
			if (self.waitingTimeoutStep < 7) {
				self.waitingTimeoutStep++;
			}
		} else {
			self.waitingTimeoutStep = 1;
		}
		return Math.pow(self.waitingTimeoutStep, 2) * 1000;
	};
	if (this._isWaitingForData(data)) {
		var timeout = calcWaitingTimeout();
		this.waitingTimer = setInterval(function() {
			self._cleanupErrorHandlers();
			if (!self.liveUpdates && self.requestType === "initial") {
				self._initLiveUpdates();
			}
			self._startLiveUpdates();
		}, timeout);
		errorCallback(data, {
			"requestType": self.requestType,
			"critical": false,
			"retryIn": timeout
		});
	} else {
		this.waitingTimeoutStep = 0;
		errorCallback(data, {
			"requestType": self.requestType,
			"critical": true
		});
	}
	this.error = data;
}
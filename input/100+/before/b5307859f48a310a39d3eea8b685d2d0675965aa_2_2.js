function(data, config) {
	var self = this;
	config = config || {};
	var timeElapsed = 0;
	var maxWaitingTimeout = 0;
	var errorCallback = config.callback;
	var calcWaitingTimeout = function() {
		// interval is calculated as e^x, x=[1..4]
		if (self.waitingTimeoutStep > 0) {
			if (self.waitingTimeoutStep < 4) {
				self.waitingTimeoutStep++;
			}
		} else {
			self.waitingTimeoutStep = 1;
		}
		return Math.round(Math.exp(self.waitingTimeoutStep)) * 1000;
	};
	if (this._isWaitingForData(data)) {
		maxWaitingTimeout = calcWaitingTimeout();
		var timeout = this._isErrorWithTimer(data) ? 1000 : maxWaitingTimeout;
		this.waitingTimer = setInterval(function() {
			timeElapsed += timeout;
			if (timeElapsed == maxWaitingTimeout) {
				self._cleanupErrorHandlers();
				if (!self.liveUpdates && self.requestType === "initial") {
					self._initLiveUpdates();
				}
				errorCallback(data, {
					"requestType": self.requestType,
					"retryTimeout": timeout,
					"critical": false
				});
				self._startLiveUpdates();
			}
		}, timeout);
	} else {
		this.waitingTimeoutStep = 0;
		errorCallback(data, {
			"requestType": self.requestType,
			"critical": true
		});
	}
	this.error = data;
}
function(config) {
	var self = this;
	config = $.extend({
		"liveUpdatesTimeout": 5,
		"submissionProxyURL": window.location.protocol + "//apps.echoenabled.com/v2/esp/activity"
	}, config);
	Echo.StreamServer.API.Request.parent.constructor.call(this, config);
	this.transport.onData = function() {
		return self.onData.apply(self, arguments);
	};
}
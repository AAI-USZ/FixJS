function(config) {
	var self = this;
	config = $.extend({
		"liveUpdatesTimeout": 5000
	}, config);
	Echo.StreamServer.API.Request.parent.constructor.call(this, config);
	this.transport.onData = function() {
		return self.onData.apply(self, arguments);
	};
}
function(config) {
	var self = this;
	config = $.extend({
		"liveUpdatesTimeout": 5,
		"onData": function() {},
		"onError": function() {},
		"submissionProxyURL": "apps.echoenabled.com/v2/esp/activity"
	}, config);
	config = this._wrapTransportEventHandlers(config);
	this.requestType = "initial"; // initial | secondary
	Echo.StreamServer.API.Request.parent.constructor.call(this, config);
}
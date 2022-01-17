function(config) {
	var self = this;
	var _config = $.extend({}, config);
	return $.extend(config, {
		"onData": function(response) {
			self._onData(response, _config);
		},
		"onError": function(responseError) {
			self._onError(responseError, _config);
		}
	});
}
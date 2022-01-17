function(config) {
	var self = this;
	var _config = $.extend({}, config);
	return $.extend(config, {
		"onData": function(response, requestParams) {
			self._onData(response, {
				"requestType": self.requestType
			}, _config);
		},
		"onError": function(responseError, requestParams) {
			self._onError(responseError, requestParams, _config);
		}
	});
}
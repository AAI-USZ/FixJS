function(config) {
	config = $.extend({
		"method": "get"
	}, config || {});
	Echo.API.Transports.AJAX.parent.constructor.call(this, config);
}
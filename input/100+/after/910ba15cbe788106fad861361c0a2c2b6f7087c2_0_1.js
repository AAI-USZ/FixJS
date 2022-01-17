function() {
	var self = this;
	var ajaxSettings = {
		url: this._prepareURL(),
		type: this.config.get("method"),
		error: function(errorResponse) {
			errorResponse = self._wrapErrorResponse(errorResponse);
			self.config.get("onError")(errorResponse);
		},
		success: this.config.get("onData"),
		beforeSend: this.config.get("onOpen"),
		dataType: "json"
	};
	if ("XDomainRequest" in window && window.XDomainRequest != null) {
		var xhrOrigin = $.ajaxSettings.xhr;
		var domain = utils.parseURL(document.location.href).domain;
		$.support.cors = true;
		ajaxSettings.xhr = function() {
			var targetDomain = utils.parseURL(self.config.get("url")).domain;
			if (targetDomain === "" || targetDomain === domain) {
				return xhrOrigin.call($.ajaxSettings);
			}
			var xdr = new XDomainRequest();
			if (!xdr.setRequestHeader) {
				xdr.setRequestHeader = $.noop;
			}
			if (!xdr.getAllResponseHeaders) {
				xdr.getAllResponseHeaders = $.noop;
			}
			xdr.onload = function () {
				if ($.isFunction(xdr.onredaystatechange)) {
					xdr.readyState = 4;
					xdr.status = 200;
					xdr.onreadystatechange.call(xdr, null, false);
				}
			};
			xdr.onerror = xdr.ontimeout = function () {
				if ($.isFunction(xdr.onreadystatechange)) {
					xdr.readyState = 4;
					xdr.status = 500;
					xdr.onreadystatechange.call(xdr, null, false);
				}
			};
			return xdr;
		};
	}
	return ajaxSettings;
}
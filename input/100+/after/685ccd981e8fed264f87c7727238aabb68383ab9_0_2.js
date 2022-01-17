function() {
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
		}
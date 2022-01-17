function msxdr (url, options, callback) {
		url += '?' + decodeURIComponent(jQuery.param(options));
		xdr = new XDomainRequest();
		xdr.timeout = 3000;
		xdr.onerror = function(){
			calling = false;
		};
		xdr.ontimeout = function(){
			calling = false;
		};
		xdr.onload = function(){
			callback(jQuery.parseJSON(xdr.responseText));
		};
		xdr.open('GET', url, true);
		xdr.send();
	}
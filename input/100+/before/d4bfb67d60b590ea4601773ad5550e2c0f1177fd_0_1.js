function (url, data, callback, type, method) {
			WDN.log("Using WDN.request");
			var $ = WDN.jQuery;
			// set the method if none/an invalid one was given
			if (!method || !/^(get|post)$/i.test(method)) {
				var method = "get";
				WDN.log("WDN.request: No valid method specified. Using GET.");
			}
			// normalize the method name
			method = method.toLowerCase();
			// first, try using jQuery.get or jQuery.post
			try {
				if (url.match(/^https?:/)
					&& (url.match(/:\/\/(.[^\/]+)/)[1] != window.location.host)) {
					WDN.log('This is a cross-origin request');
					// IE9 fails silently, so force it to throw an error and use XDR
					if (WDN.jQuery.browser.msie
						&& parseInt(WDN.jQuery.browser.version, 10) < 10) {
						WDN.log('IE detected. Raising an error to force XDR or proxy.');
						throw("IE, use XDR or proxy");
					}
					// Opera fails silently, so force it to throw an error and revert to the proxy
					if (window.opera && Object.toString(window.opera.version).indexOf("[native code]") > 0) {
						WDN.log("Opera detected. Raising an error to force proxy.");
						throw ("Opera");
					}
				}
				WDN.log("Using jQuery." + method + " for the request...");
				$[method](url,data,callback,type);
				WDN.log("jQuery." + method + " worked.");
			} catch (e) {
				WDN.log("jQuery." + method + " failed.");
				WDN.log(e);
				
				// the jQuery method failed, likely because of the same origin policy

				var params = data;

				// if data is an object, convert it to a key=value string
				if (data && $.isPlainObject(data)) {
					WDN.log("WDN.request: Converting data object to query string.");
					params = '';
					for (var key in data) {
					    params = params+'&'+key+'='+data[key];
					}
				}

				// if using get, append the data as a querystring to the url
				if (params && method == "get") {
					WDN.log("WDN.request: Appending data parameters to querystring.");
					if (!/\?/.test(url)) {
						url += "?";
					}
					url += params.substr(1, params.length);
					params = null;
				}
				
				// Try CORS, or use the proxy
				if (window.XDomainRequest) {
					WDN.log("Using XDomainRequest...");
					var xdr = new XDomainRequest();
					xdr.open(method, url);
					xdr.onload = function () {
						WDN.log("XDomainRequest worked.");
						var responseText = this.responseText, dataType = (type || "").toLowerCase();
						// if we are expecting and XML object and get a string, convert it
						if (typeof responseText == "string" && dataType == "xml") {
							WDN.log("WDN.get: Converting response to XML document.");
							responseText = WDN.stringToXML(responseText);
						}
						callback(responseText, "success", this);
					};
					xdr.onprogress = function(){};
					xdr.send(params);
				} else {
					try {
						WDN.log('Using proxy');
						var mycallback = function() {
							var textstatus = 'error';
							var data = 'error';
							if ((this.readyState == 4) && (this.status == '200')) {
								textstatus = 'success';
								data = this.responseText;
							}
							callback(data, textstatus, this);
						};
						var request = new WDN.proxy_xmlhttp();
						request.open(method.toUpperCase(), url, true);
						if (method == "post") {
							request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
						}
						request.onreadystatechange = mycallback;
						request.send(params);
					} catch(f) {
						WDN.log("Could no fetch using the proxy.");
						WDN.log(f);
					}
				}
			}
			
		}
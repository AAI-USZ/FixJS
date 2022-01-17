function loadObject(aEvent) {
					var headers = {};
					var _headers = aEvent.target.getAllResponseHeaders().split("\n");

					for (var i in _headers) {
						var _header = _headers[i].split(":");

						try {
							var key = _header[0].toLowerCase();
							_header.shift();
							var value = $.trim(_header.join(":"));

							if (value != "") {
								headers[key] = value.toString();
							}
						} catch(e) {
						}
					}

					sidecar.resources.push({
						"uri" : src,
						"referrer" : document.location.href,
						"method" : "HEAD",
						"status" : aEvent.target.status,
						"status_text" : aEvent.target.statusText,
						"date" : aEvent.target.getResponseHeader("date"),
						"modified" : aEvent.target.getResponseHeader("last-modified"),
						"expires" : aEvent.target.getResponseHeader("expires"),
						"content_type" : aEvent.target.getResponseHeader("content-type").split(";")[0],
						"charset" : null,
						"size" : 0,
						"headers" : headers,
						"stop_time" : 0,
						"start_time" : 0,
						"transfer_time" : 0
					});
					
					xhrMephisto.removeEventListener("load", loadObject, false);
				}
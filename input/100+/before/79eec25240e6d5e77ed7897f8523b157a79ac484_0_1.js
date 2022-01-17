function() {
		var unknown = true, src;

		if ($(this).attr('data')) {
			src = $(this).attr('data');
		} else if ($(this).attr('src')) {
			src = $(this).attr('src');
		} else {
			$("param", this).each(function() {
				var name = $(this).attr('name').toLowerCase();
				if ($.inArray(name, ["src", "movie"]) != -1) {
					src = $(this).attr('value');
				}
			});
		}

		if (src) {
			var a = document.createElement('a');
			a.href = src;
			src = a.href;

			if (unknown) {
				xhrMephisto.open("HEAD", src, false);

				xhrMephisto.onload = function() {
					var headers = {};
					var _headers = xhrMephisto.getAllResponseHeaders().split("\n");

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
						"status" : xhrMephisto.status,
						"status_text" : xhrMephisto.statusText,
						"date" : xhrMephisto.getResponseHeader("date"),
						"modified" : xhrMephisto.getResponseHeader("last-modified"),
						"expires" : xhrMephisto.getResponseHeader("expires"),
						"content_type" : xhrMephisto.getResponseHeader("content-type").split(";")[0],
						"charset" : null,
						"size" : 0,
						"headers" : headers,
						"stop_time" : 0,
						"start_time" : 0,
						"transfer_time" : 0
					});
				}

				xhrMephisto.send(null);
			}
		}
	}
function send () {
			req = getXHR();
			if (mimeType && req.overrideMimeType) {
				req.overrideMimeType(mimeType);
			}
			req.open("GET", url, true);
			req.onreadystatechange = function (e) {
				if (req.readyState === 4) {
					if (req.status < 300) {
						callback(req);
					}
				}
			};
			req.send(null);
		}
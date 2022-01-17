function send() {
			req = getXHR();
			if (mimeType && req.overrideMimeType) {
				req.overrideMimeType(mimeType);
			}
			req.open("GET", url, true);
			req.onreadystatechange = function (e) {
				var data;
				if (req.readyState === 4) {
					if (req.status < 300) {
						if(JSON) {
							data = JSON.parse(req.response);
						} else {
							data = this._parse(req.response);
						}
						callback(data);
					}
				}
			};
			req.send(null);
		}
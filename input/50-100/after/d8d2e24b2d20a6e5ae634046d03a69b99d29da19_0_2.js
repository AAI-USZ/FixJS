function (e) {
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
			}
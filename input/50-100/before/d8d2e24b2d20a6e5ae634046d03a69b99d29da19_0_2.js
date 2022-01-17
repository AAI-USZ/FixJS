function (e) {
				if (req.readyState === 4) {
					if (req.status < 300) {
						callback(req);
					}
				}
			}
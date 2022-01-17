function (json, error) {
			if (!error) {
				callback(json);
			}
			else {
				callback(null, error);
			}
		}
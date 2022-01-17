function (error, json) {
			if (!error) {
				callback(null, json);
			}
			else {
				callback(error);
			}
		}
function getGist(id, callback) {
		var url = getApiUrlForGistId(id);
		requestJson(url, function (json, error) {
			if (!error) {
				callback(json);
			}
			else {
				callback(null, error);
			}
		});
	}
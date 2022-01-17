function(callback, includeStatus) {
		var query = {};
		if(includeStatus) {
			query.includeStatus = 'true';
		}
		return tnoodle.retryAjax(callback, this.puzzlesUrl, query);
	}
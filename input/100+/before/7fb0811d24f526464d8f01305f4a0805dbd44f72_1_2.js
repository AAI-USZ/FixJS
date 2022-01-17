function (call) {
		callback = call;
		console.log('newsblur refresh');
		// need to refresh feeds before getting list to ensure count isn't stale
		$.getJSON('/newsblur/reader/refresh_feeds', function () {
			$.getJSON('/newsblur/reader/feeds', processFeeds);
		});
	}
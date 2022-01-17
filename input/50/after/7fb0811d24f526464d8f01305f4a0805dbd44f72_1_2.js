function () {
			ajax('GET', '/newsblur/reader/feeds', null, processFeeds);
		}
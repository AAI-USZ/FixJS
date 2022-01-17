function (call) {
		callback = call;
		console.log('newsblur refresh');

		var ajax = function (protocol, url, data, callback) {
			$.ajax({
				type: protocol,
				url: url,
				data: data,
				dataType: 'json',
				success: callback,
				error: function (xhr, type) {
					console.log(type + " " + xhr.statusText + "!");
					callback();
				}
			});
		};

		// need to refresh feeds before getting list to ensure count isn't stale
		ajax('GET', '/newsblur/reader/refresh_feeds', null, function () {
			ajax('GET', '/newsblur/reader/feeds', null, processFeeds);
		});
	}
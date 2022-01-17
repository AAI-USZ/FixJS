function() {

		// attach error listener
		addHandler(window, "onerror", function (msg, url, num) {
			handleError(msg,url,num);
			return true;
		});

		// attach loop to send to server
		processInterval = window.setInterval(function() {
			if (messageQueue.length) {
				processQueue();
			}
		}, settings.processInterval*1000);

		if (hasOfflineEvents) {
			addHandler(window, "ononline", function() {
				console.log("came back online");
				loadStoredErrors();
				processQueue();
			});
		}

	}
function() {

		// attach error listener
		addHandler(window, 'onerror', function (msg, url, num) {
			handleError(msg,url,num);
			return true;
		});

		// attach loop to send to server
		processInterval = window.setInterval(function() {
			if (messageQueue.length) {
				processQueue();
			}
		}, 10*1000);

	}
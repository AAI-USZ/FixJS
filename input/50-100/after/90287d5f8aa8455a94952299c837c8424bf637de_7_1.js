function(namespace) {

		var app = namespace.app;

		var INTERVAL = 2000;

		var options = {
			delay: INTERVAL
		};

		var TorrentPoller = function() {
			this.poller = PollingManager.getPoller(app.torrents, options);
		};

		TorrentPoller.prototype.start = function() {
			this.poller.start();
		};

		TorrentPoller.prototype.INTERVAL = INTERVAL;


		return TorrentPoller;

	}
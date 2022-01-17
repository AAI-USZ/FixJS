function(data) {
			if (self.liveUpdates.timers.watchdog) {
				clearTimeout(self.liveUpdates.timers.watchdog);
			}
			self._changeLiveUpdatesTimeout(data);
		}
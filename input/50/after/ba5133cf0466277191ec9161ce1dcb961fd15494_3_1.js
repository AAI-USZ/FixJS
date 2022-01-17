function(responseObj) {
				if (responseObj && typeof responseObj == 'object') {
					self.set(responseObj);
					callback && callback.call(self, responseObj);
				}

				// remove this one-off event.
				self.removeEvents(throwAway);
			}
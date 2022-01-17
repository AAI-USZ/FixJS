function deferredHold(dfdHold) {
			var widget;

			// Check that we are holding
			if (HOLDING in self) {
				// Get what we're holding
				widget = self[HOLDING];

				// Cleanup
				delete self[HOLDING];

				// Remove DATA_HOLDING attribute
				self[$ELEMENT].removeAttr(DATA_HOLDING);

				// Deferred stop
				Deferred(function deferredStop(dfdStop) {
					widget.stop(dfdStop);
				})
				.then(dfdHold.resolve, dfdHold.reject);
			}
			else {
				dfdHold.resolve();
			}

			// Link deferred
			if (deferred) {
				dfd.then(deferred.resolve, deferred.reject);
			}
		}
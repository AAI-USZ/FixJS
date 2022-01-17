function () {
					_observable.unwatch(handler);
					// If no more observers
					if (!_observable.hasTopic(topic)) {
						// stop listening
						_stops[topic]();
					}
			}
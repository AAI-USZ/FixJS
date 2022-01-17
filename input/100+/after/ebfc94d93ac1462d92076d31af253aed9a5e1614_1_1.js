function listen(channel, reqData, func, scope) {
			
			var topic = channel + "/" + reqData.path,
				handler;
			
			// If listen to this topic for the first time
			if (!_observable.hasTopic(topic)) {
				// Add params to the request
				Tools.mixin({
					method: "GET",
					__keepalive__: true
				}, reqData);
				
				// Listen to changes on this topic (an url actually)
				_stops[topic] = this.request(channel, reqData, 
						// Notify when new data arrives
						function (data) {
					_observable.notify(topic, data);
				}, this);
			}
			
			// Add the observer
			handler = _observable.watch(topic, func, scope);

			return function () {
					_observable.unwatch(handler);
					// If no more observers
					if (!_observable.hasTopic(topic)) {
						// stop listening
						_stops[topic]();
					}
			};
		}
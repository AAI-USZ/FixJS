function listen(channel, reqData, func, scope) {
			
			var topic = channel + "/" + reqData.path,
				handler,
				stop;
			
			// If no such topic
			if (!_observable.hasTopic(topic)) {
				Tools.mixin({
					method: "GET",
					__keepalive__: true
				}, reqData);
				
				// Listen to changes on this topic (an url actually)
				stop = this.request(channel, reqData, 
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
						stop();
					}
			};
		}
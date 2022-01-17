function(type, publisher, data) {
		if (!this.subscribers[type]) {
			return false;
		}

		var event = new events.Event(type, publisher, data);
		var subscribers = this.subscribers[type], i = 0, length = subscribers.length, subscriber;

		for (i; i < length; i++) {
			if (event.cancelled) {
				break;
			}

			subscriber = subscribers[i];

			try {
				subscriber.instance[ subscriber.method ](event);
			}
			catch (error) {
				if (events.Dispatcher.logger) {
					events.Dispatcher.logger.error("events.Dispatcher#publish - An error was thrown while publishing event " + type);
					events.Dispatcher.logger.error(error);
				}
				else {
					throw error;
				}
			}
		}

		return true;
	}
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
			subscriber.instance[ subscriber.method ](event);
		}

		return true;
	}
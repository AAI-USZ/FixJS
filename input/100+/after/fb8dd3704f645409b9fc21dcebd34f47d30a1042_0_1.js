function(handler, type, data) {
		//kroll.log(TAG, "calling event handler: type:" + type + ", data: " + data + ", handler: " + handler);
		if (!handler.listener || !(handler.listener.call)) {
			if (kroll.DBG) {
				kroll.log(TAG, "handler for event '" + type + "' is " + (typeof handler.listener) + " and cannot be called.");
			}
			return;
		}

		// Create event object, copy any custom event data,
		// and setting the "type" and "source" properties.
		var event = { type: type, source: this };
		if (Object.prototype.toString.call(data) === "[object Object]") {
			kroll.extend(event, data);
		}

		if (handler.self && (event.source == handler.self.view)) {
			event.source = handler.self;
		}
		handler.listener.call(this, event);
	}
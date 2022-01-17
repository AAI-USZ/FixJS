function(handler, type, data) {
		//kroll.log(TAG, "calling event handler: type:" + type + ", data: " + data + ", handler: " + handler);
		if (!handler.listener || !(handler.listener.call)) {
			if (kroll.DBG) {
				kroll.log(TAG, "handler for event '" + type + "' is " + (typeof handler.listener) + " and cannot be called.");
			}
			return;
		}

		if (data instanceof Object) {
			data.type = type;
		} else if (!data) {
			data = { type: type };
		}
		if (handler.self && (data.source == handler.self.view)) {
			data.source = handler.self;
		}
		handler.listener.call(this, data);
	}
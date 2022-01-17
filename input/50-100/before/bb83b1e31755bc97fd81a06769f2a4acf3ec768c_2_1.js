function capture(doCapture, events) {
		var method = doCapture ? window.addEventListener : window.removeEventListener;
		self.captureEvents = events || self.captureEvents;
		self.captureEvents.forEach(function (type) { 
			method(type, genericEventHandler, false);
		} );
	}
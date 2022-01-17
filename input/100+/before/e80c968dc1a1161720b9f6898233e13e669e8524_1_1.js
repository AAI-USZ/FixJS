function genericEventHandler (event) {
		var eventobj = copyEvent(event),
			fireEvent = true,
			ts = new Date().getTime();
		if (self.showTouches) {
			showTouches(event);	
		}
		if (event.type === 'devicemotion' || event.type === 'deviceorientation') {
			if (ts - lastMotionEvent > self.deviceEventInterval) {
				lastMotionEvent = ts;
			} else {
				fireEvent = false;
			}
		}
		if (fireEvent) {
			socket.emit('rcjs:event', { 
				type: event.type, 
				event: eventobj, 
				key: self.key, 
				tokenId: self.tokenId 
			});
		}
		event.preventDefault();
	}
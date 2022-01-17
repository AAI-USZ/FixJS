function genericEventHandler(event) {
		var eventobj = copyEvent(event);
		
		if (self.showTouches) {
			if (event.type === 'touchmove') {
				$('.touch').hide();
				for (var i = 0; i < event.touches.length; i++) {
					var e = event.touches[i];
					$('#Touch' + (i+1)).css({
						left: e.clientX,
						top: e.clientY
					}).show();
				}
			} else if (event.type === 'touchend') {
				if (event.touches.length === 0) {
					$('.touch').hide();
				}
			}
		}

		socket.emit('rcjs:event', { 
			type: event.type, 
			event: eventobj, 
			key: self.key, 
			tokenId: self.tokenId 
		});
		event.preventDefault();
	}
function () {
		self.emitEvent('rcjs:connect', {});

		// Request: from server to receiver after a valid rcjs:supplyToken message from sender. 
		// Response: rcjs:confirmRegister message to server.  
		socket.on('rcjs:registerSender', function (data) {
			self.isReceiving = true;
			socket.emit('rcjs:confirmRegistration', { tokenId: data.tokenId, events: self.captureEvents } );
			socket.on('rcjs:event', function (data) {
				type = data.type;
				if (type && self.isReceiving) { self.emitEvent(type, data.event); }
			} );
			self.emitEvent('rcjs:remoteConnect', data);
		});

		// Request: from server as response to rcjs:requestToken message with tokenId property.
		// Emits rcjs:requestToken event 
		socket.on('rcjs:token', function (data) {
			self.emitEvent('rcjs:token', data);
		});

		socket.on('rcjs:remoteDisconnect', function (data) {
			self.isReceiving = false;
			self.emitEvent('rcjs:remoteDisconnect', {});
		});
	}
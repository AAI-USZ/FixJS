function (data) {
			self.isReceiving = true;
			socket.emit('rcjs:confirmRegistration', { tokenId: data.tokenId, events: self.captureEvents } );
			socket.on('rcjs:event', function (data) {
				type = data.type;
				if (type && self.isReceiving) { self.emitEvent(type, data.event); }
			} );
			self.emitEvent('rcjs:remoteConnect', data);
		}
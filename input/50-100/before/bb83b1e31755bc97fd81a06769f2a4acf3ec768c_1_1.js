function (data) {
			console.log('sender registered');
			socket.emit('rcjs:confirmRegistration', { tokenId: data.tokenId, events: self.captureEvents } );
			socket.on('rcjs:event', function (data) {
				type = data.type;
				if (type) { self.emitEvent(type, data.event); }
			} );
		}
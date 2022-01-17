function () {
		self.emitEvent('rcjs:connected');

		socket.on('rcjs:startCapture', function (data) {
			self.key = data.key;
			capture(true, data.events);
			self.emitEvent('rcjs:startCapture');
		});

		socket.on('rcjs:receiverDisconnect', function (data) {
			capture(false);
			self.emitEvent('rcjs:receiverDisconnect');
		});

		socket.on('rcjs:supplyToken', function (data) {
			if (data.error) {
				self.emitEvent('rcjs:error', { msg: data.error } );
			}
		});

		socket.on('disconnect', function (data) {
			self.emitEvent('rcjs:serverDisconnect');
		});
	}
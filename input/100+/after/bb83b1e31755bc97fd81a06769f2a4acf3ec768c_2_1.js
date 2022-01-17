function () {
		self.emitEvent('rcjs:connect');

		socket.on('rcjs:startCapture', function (data) {
			self.key = data.key;
			capture(true, data.events);
			self.emitEvent('rcjs:startCapture');
		});

		socket.on('rcjs:remoteDisconnect', function (data) {
			capture(false);
			self.emitEvent('rcjs:remoteDisconnect');
			self.isCapturing = false;
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
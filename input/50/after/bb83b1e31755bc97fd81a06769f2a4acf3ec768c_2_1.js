function (data) {
			capture(false);
			self.emitEvent('rcjs:remoteDisconnect');
			self.isCapturing = false;
		}
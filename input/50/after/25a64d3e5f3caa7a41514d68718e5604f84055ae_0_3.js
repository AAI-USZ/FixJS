function(exception) {
			clearConnection();
			if (verbose) log('Client error', exception);
			self.emit('clientError', exception);
		}
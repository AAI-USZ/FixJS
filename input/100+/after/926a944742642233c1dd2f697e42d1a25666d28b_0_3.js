function () {
		self.connection.end ();
		if (callback) {
			callback.call (self);
		}
	}
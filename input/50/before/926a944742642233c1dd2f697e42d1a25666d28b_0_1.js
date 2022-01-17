function () {
		self.connection.end ();
		callback.call (self);
	}
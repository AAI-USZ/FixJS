function (callback) {
	var quit_message, self = this;

	quit_message = this.profile.quit_message;

	if (this.connection.readyState !== "open") {
		callback.call (this);
		return;
	}

	// If we didn't receive a 001 command,
	// then we should just end the connection
	if (!this.welcomed) {
		this.connection.end ();
		callback.call (this);
		return;
	}

	this.raw ("QUIT" + (quit_message ? " :" + quit_message : ""));

	this.connection.once ("end", function () {
		callback.call (self);
	});

	setTimeout (function () {
		self.connection.end ();
		callback.call (self);
	}, 10000);
}
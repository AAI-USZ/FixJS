function() {
		var args = Array.prototype.slice.call(arguments);
		var message = util.format.apply(this, args);
		message = this.getErrorLogMessagePrefix() + message;
		console.log(message);
	}
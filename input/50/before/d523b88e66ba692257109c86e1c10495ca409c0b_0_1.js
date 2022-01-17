function(command, options) {
		var message = {};
		message[command] = options || true;
		this.sendCommand('gameCommand', message);
	}
function(command, options) {
		for(var id in this.users) {
			this.users[id].sendCommand(command, options);
		}
	}
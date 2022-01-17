function(command, options) {
		this.sendCommand('gameCommand', ProtocolHelper.assemble(command, options));
	}
function(update_world) {
		this.channel.sendCommandToAllUsers('gameCommand', {worldUpdate: update_world});
	}
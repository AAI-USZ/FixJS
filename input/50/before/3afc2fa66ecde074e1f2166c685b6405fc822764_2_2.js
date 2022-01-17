function(user) {
		var player = Parent.prototype.userJoined.call(this, user);
		this.inputControllers[player.id] = new InputController(player);
	}
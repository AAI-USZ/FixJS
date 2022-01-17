function(user) {
		Parent.prototype.userJoined.call(this, user);
		
		var id = user.id;
		var player = this.players[id];
		this.inputControllers[id] = new InputController(player);
	}
function(user) {
		this.serverGame.userIdLeft(user.id);

		this.sendCommandToAllUsersExcept("userLeft", user.id, user);
		delete this.users[user.id];
	}
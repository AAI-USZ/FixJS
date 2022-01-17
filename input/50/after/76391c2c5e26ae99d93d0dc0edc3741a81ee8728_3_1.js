function(user) {
		this.gameController.userIdLeft(user.id);

		this.sendCommandToAllUsersExcept("userLeft", user.id, user);
		delete this.users[user.id];
	}
function(user){
		var userIds = Object.keys(this.users);

		this.users[user.id] = user;
		
		user.sendCommand('joinSuccess', {channelName: this.name, id: user.id, userIds: userIds});
		this.sendCommandToAllUsersExcept('userJoined', user.id, user);

		this.serverGame.createPlayerForUser(user)
	}
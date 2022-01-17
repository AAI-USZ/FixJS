function(user){
		this.users[user.id] = user;
		
		user.sendCommand('joinSuccess', this.name);
		this.sendCommandToAllUsersBut('userJoined', user.id, user);
	}
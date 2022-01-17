function(command, options){
		switch(command) {

			case 'join':
				this.coordinator.assignUserToChannel(this, options);
				break;

			case 'leave':
				this.coordinator.assignUserToLobby(this);
				break;

			case 'gameCommand':
				for(var gameCommand in options) {
					//NotificationCenter.trigger("processGameCommandFromUser", [gameCommand, options[gameCommand], this]);
					//this.channel.processGameCommandFromUser(gameCommand, options[gameCommand], this);
				}
				break;

			default: 
				break;
		}
	}
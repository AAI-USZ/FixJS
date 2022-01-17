function(command, options) {
		switch(command) {
			case 'joinSuccess':
				this.onJoinSuccess(options);
				break;

			case 'gameCommand':
				for(var gameCommand in options) {
					this.GameController.processGameCommand(gameCommand, options[gameCommand]);
				}
				break;

			case 'userJoined':
				this.onUserJoined(options);
				break;

			case 'userLeft':
				this.onUserLeft(options);
				break;

			default:	
				break;
		}
	}
function(command, options) {
		switch(command) {
			case 'joinSuccess':
				this.onJoinSuccess(options);
				break;

			case 'gameCommand':
				for(var c in options) {
					this.clientGame.processGameCommand(c, options[c]);
				}
				break;

			case 'userJoined':
				this.onUserJoined(options);
				break;

			default:	
				break;
		}
	}
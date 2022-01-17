function(command, options){
		switch(command) {
			case 'joinSuccess':
				this.onJoinSuccess(options);
				break;

			case 'gameCommand':
				this.clientGame.processGameCommand(options);
				break;

			default:	
				break;
		}
	}
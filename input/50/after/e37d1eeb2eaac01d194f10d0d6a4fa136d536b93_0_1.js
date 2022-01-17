function(channelName) {
		this.clientGame = new ClientGame(this);
		this.clientGame.loadLevel("default.json")
		console.log("Joined " + channelName);
	}
function(options) {
		this.gameController = new GameController(this, options.id);
		this.gameController.loadLevel("default.json")
		console.log("Joined " + options.channelName);

		if (options.userIds && options.userIds.length > 0) {
			for(var i = 0; i < options.userIds.length; i++) {
				this.gameController.userJoined(options.userIds[i])
			}
		}
	}
function(options) {
		this.GameController = new GameController(this, options.id);
		this.GameController.loadLevel("default.json")
		console.log("Joined " + options.channelName);

		if (options.userIds && options.userIds.length > 0) {
			for(var i = 0; i < options.userIds.length; i++) {
				this.GameController.userJoined(options.userIds[i])
			}
		}
	}
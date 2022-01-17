function Channel(name) {
		this.name = name;
		this.users = {};
		this.gameController = new GameController();
		this.gameController.loadLevel("default.json");

		var self = this;
		NotificationCenter.on("processGameCommandFromUser", function(topic, args) {
			self.processGameCommandFromUser.apply(self, args);
		});
	}
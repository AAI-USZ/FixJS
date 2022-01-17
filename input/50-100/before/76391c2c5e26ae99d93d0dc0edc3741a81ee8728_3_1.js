function Channel(name) {
		this.name = name;
		this.users = {};
		this.serverGame = new GameController();
		console.log("server game " + this.serverGame);
		this.serverGame.loadLevel("default.json");

		var self = this;
		NotificationCenter.on("processGameCommandFromUser", function(topic, args) {
			self.processGameCommandFromUser.apply(self, args);
		});
	}
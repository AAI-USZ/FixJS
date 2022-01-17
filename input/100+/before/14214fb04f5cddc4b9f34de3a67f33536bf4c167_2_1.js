function() {
		var loadings = [];

		var self = this;
		for (var i = 0; i < this.levelsList.length; i++) {
			var name = this.levelsList[i];
			Logger.systemLog(this.consoleName, 'loading level: '+name);

			loadings.push(this.loadLevel(name));
		}

		Cassidie.wait(loadings, function() {
			Logger.systemLog(self.consoleName, 'all level loaded');
			self.emit(Game.READY);
		});
	}
function() {
		var loadings	= [];
		var self		= this;

		if (this.levelsList.length == 0) {
			Logger.systemLog(this.consoleName, 'no level loaded');
			setTimeout(function() {
				self.emit(Game.READY);
			}, 500);			
		}

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
function () {
				model.set({'currentLevelNum' : model.get('currentLevelNum') + 1});
				Crafty.trigger('LevelRestart');
			}
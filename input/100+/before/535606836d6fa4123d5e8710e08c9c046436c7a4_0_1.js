function() {
		var finishedLevel = $j(self.div).find('th.completed').length == self.getWidth() + self.getHeight();
		if (finishedLevel) {
			// level up
			self.levelUp();
			// check if there are any more levels to accomplish
			if (self.level > self.levels.length) {
				alert('Game Over! You won!');
			} else {
				self.addLevelToSelect();
				alert('Level '+(self.level-1)+' finished;  Level '+self.level+' unlocked!');
				self.loadLevel();
			}
		}
	}
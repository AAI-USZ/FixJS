function() {
		var finishedLevel = $j(self.div).find('th.completed').length == self.getWidth() + self.getHeight();
		if (finishedLevel) {
			var cookieLevel = self.getCookieLevel();
			var levelUnlocked = (cookieLevel && cookieLevel < (self.level+1));
			// level up
			self.levelUp();
			// check if there are any more levels to accomplish
			if (self.level > self.levels.length) {
				alert('Game Over! You won!');
			} else {
				self.addLevelToSelect();
				alert('Level '+(self.level-1)+' finished' + (levelUnlocked ? ';  Level '+self.level+' unlocked!' : ''));
				self.loadLevel();
			}
		}
	}
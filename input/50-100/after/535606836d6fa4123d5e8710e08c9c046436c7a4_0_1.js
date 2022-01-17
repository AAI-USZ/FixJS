function() {
		if (typeof(self.level) == 'undefined') {
			self.level = 1;
			// check if there is a cookie
			var levelCookie = self.getCookieLevel();
			if (levelCookie) {
				if (levelCookie > 1) {
					if (levelCookie > self.levels.length)
						levelCookie = self.levels.length;
					while (self.level < levelCookie) {
						self.level++;
						self.addLevelToSelect();
					}
				}
			}	
		}
		self.loadLevel();
	}
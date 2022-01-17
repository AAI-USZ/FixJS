function() {
		if (typeof(self.level) == 'undefined') {
			self.level = 1;
			// check if there is a cookie
			var levelCookie = self.getCookie('level');
			if (levelCookie) {
				parsedLevelCookie = parseInt(levelCookie);
				if (parsedLevelCookie > 1) {
					while (self.level < parsedLevelCookie) {
						self.level++;
						self.addLevelToSelect();
					}
				}
			}	
		}
		self.loadLevel();
	}
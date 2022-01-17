function() {
		self.level++;
		// set/update cookie
		var levelCookie = self.getCookieLevel();
		if (!levelCookie || levelCookie < self.level)
			self.setCookie('level', self.level.toString());
	}
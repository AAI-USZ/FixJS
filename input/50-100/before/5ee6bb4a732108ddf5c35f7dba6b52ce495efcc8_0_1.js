function() {
		self.level++;
		
		// set/update cookie
		var levelCookie = self.getCookie('level');
		if (!levelCookie || parseInt(levelCookie) < self.level)
			self.setCookie('level', self.level.toString());
		
		// update the select
		self.addLevelToSelect();
	}
function() {
		self.level++;
		
		// set/update cookie
		self.setCookie('level', self.level.toString());
		
		// update the select
		self.addLevelToSelect();
	}
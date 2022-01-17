function() {
		var levelCookie = self.getCookie('level');
		if (levelCookie)
			return parseInt(levelCookie);
	}
function(username) {
		// XXX the \d+ test there is a hack related to #270
		if(typeof username != "string" || !validUsernameExp.test(username)
				|| !/^\d+$/.test(username)) {
			username = "";
		}
		return username;
	}
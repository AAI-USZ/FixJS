function(username) {
		if(typeof username != "string" || !validUsernameExp.test(username)) {
			username = "";
			}
		return username;
		}
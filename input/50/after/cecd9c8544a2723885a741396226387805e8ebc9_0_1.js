function(error, status, username) {
		if (error || !status) {
			response.redirect(loginUrl);
			return;
		}
		console.log(username + " logged in!");
		response.sendfile(__dirname + '/index.html');
	}
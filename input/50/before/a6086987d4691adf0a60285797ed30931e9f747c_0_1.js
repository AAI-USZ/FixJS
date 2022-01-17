function (req, res) {
	res.send('<a href="https://github.com/login/oauth/authorize?client_id=' + Github.loadConfig().oauth_client_id + '&redirect_uri=http://http://instaedit-server.herokuapp.com/oauth-redirect">Authenticate</a>');
	res.end();
}
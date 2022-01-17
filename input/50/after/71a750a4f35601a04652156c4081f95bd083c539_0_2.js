function(req, res) {
	if (conf.stagingServer) {
		req.session.userID = req.params.uid;
	}
	res.render('redirect', {title: 'Redirecting ...', redirectURL: 'http://localhost:5555/'})
}
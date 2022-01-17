function(req, res) {
	if ('localhost:5555' == req.headers.host) {
		req.session.userID = req.params.uid;
	}
	res.render('redirect', {title: 'Redirecting ...', redirectURL: 'http://localhost:5555/'})
}
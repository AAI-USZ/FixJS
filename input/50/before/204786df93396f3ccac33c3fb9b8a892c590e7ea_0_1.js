function(req, res) {
	req.session.isAdmin = true;
	req.session.save();
	res.serveClient('main');
}
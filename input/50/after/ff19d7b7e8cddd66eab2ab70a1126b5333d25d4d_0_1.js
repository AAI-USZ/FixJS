function (req, res) {
	res.redirect('/authenticate/' + req.query["code"]);
}
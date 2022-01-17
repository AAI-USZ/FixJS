function (req, res) {
	console.log(req);
	res.redirect('/authenticate/' + req.params.code);
}
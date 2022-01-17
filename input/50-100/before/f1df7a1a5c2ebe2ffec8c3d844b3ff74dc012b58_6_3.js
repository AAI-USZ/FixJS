function(req, res, next){
	if (req.isXMLHttpRequest){
		req.session.destroy();
		res.send();
	} else {
		var options = {
			root: pageRoot,
			path: 'app.html',
			getOnly: true
		};
		express['static'].send(req, res, next, options);
	}
}
function(req, res, next){
	
	if (req.session){
		req.session.destroy();
		console.log('Session destroyed');
	}
	
	if (req.isXMLHttpRequest){
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
function (req, res) {
		req.session.lang = req.params.value;
		res.writeHead(302, {
                	'Location': '/'
                });
		res.end();
	}
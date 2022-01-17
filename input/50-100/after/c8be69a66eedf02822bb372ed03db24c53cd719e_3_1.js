function (req, res) {
console.log(req.body.choosed_lang);
		req.session.lang = req.body.choosed_lang;
		res.writeHead(302, {
                	'Location': '/'
                });
		res.end();
	}
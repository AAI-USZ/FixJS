function (error, response, body) {

		if (response.statusCode == 200) {	
			var 
				window = jsdom.jsdom(null, null, {
					parser: html5,
					features: {
						QuerySelector: true
					}
				}).createWindow(),
				parser = new html5.Parser({document: window.document});

			parser.parse(body);

			articlize(window.document, req.body.article_url);
			
		}
		
		res.render("engage/index", { 	title: "SFU ENGAGE",
								user :  userobject, 
								status : "logged in",
								courses : req.session.courses,
								errormsg : error })
	}
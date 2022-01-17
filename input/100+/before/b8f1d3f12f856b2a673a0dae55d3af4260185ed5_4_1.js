function(req, res){

	if (!req.body.article_url) {
		var error = "";
		if (req.method === 'POST') {
			error ="please enter an URL" ;
		}
		res.render("engage/index", { 	
							title: "SFU ENGAGE",
							user :  userobject, 
							status : "logged in",
							errormsg : error })
		return;
	}


	//var pathname = req.body.article_url.substring(0,pathname.lastIndexOf("/"));
	//console.log(req.body.article_url.split("/"));
	

	request(req.body.article_url, function (error, response, body) {

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
								errormsg : error })
	});
}
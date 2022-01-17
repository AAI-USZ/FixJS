function(req, res) {
		// Extract the url components
		var tokenized = url.parse(req.url);
		
		if(tokenized.path != tokenized.pathname) {
			// There are query parameters, so not a static resource
			return [[req, res, new Error('Not a static resource')]];
		}
		return [null, [req, res, tokenized.path]];
	}
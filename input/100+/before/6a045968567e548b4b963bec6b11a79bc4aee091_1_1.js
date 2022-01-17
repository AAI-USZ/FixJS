function(req, res) {
		checkUpdateCache();
		res.render('index', viewModelCache);
	}
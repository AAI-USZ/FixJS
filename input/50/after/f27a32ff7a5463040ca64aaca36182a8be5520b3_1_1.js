function(req, res) {
		
		getIndexViewModel(function(indexViewModel) {
			res.render('index', indexViewModel);
		});
	}
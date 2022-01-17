function index(req, res) {
		res.render('about', { 
			shared: s.getSharedViewModel(),
			title: 'About rarely updated' 
		});
	}
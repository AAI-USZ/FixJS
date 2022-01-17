function index(req, res) {
		res.render('about', { 
			shared: s.getSharedViewModel('about'),
			title: 'About rarely updated' 
		});
	}
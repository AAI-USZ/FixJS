function index(req, res) {
		res.render('reading', { 
			shared: s.getSharedViewModel(),
			title: 'Reading list' 
		});
	}
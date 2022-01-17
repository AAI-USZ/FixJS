function index(req, res) {

		s.getSharedViewModel('about', function gotSharedViewModel(err, sharedModel) {
			res.render('about', {
				shared: sharedModel,
				title: 'About rarely updated'
			});
		});
	}
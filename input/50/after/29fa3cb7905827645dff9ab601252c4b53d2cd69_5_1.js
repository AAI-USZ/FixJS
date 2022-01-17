function index(req, res) {
		s.getReadingListViewModel(function(error, model) {
			// TODO: handle error?
			res.render('reading', model);
		});
	}
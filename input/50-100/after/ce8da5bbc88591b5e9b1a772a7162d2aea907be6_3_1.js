function index(req, res) {
		var thisPage = s.topLevelPages.about;
		s.getSharedViewModel(thisPage, function gotSharedViewModel(err, sharedModel) {
			res.render(thisPage.id, { shared: sharedModel, title: thisPage.title });
		});
	}
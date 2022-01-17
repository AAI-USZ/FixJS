function(app) {

	var aboutPage = l.topLevelPages.about;

	/*
	GET /about
	*/
	app.get(aboutPage.routePattern, l.forTopLevelPage(aboutPage), function(req, res) {
		s.getAboutViewModel(function (err, model) {
			res.render(aboutPage.pageTemplateName, model);
		});
	});
}
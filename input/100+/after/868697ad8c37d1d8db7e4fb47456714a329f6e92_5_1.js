function(app) {

	var s = require('../lib/shared');
	var l = require('../middleware/layout');

	app.get('/reading', l.forTopLevelPage(l.topLevelPages.reading), function index (req, res) {
		s.getReadingListViewModel(function (error, viewModel) {
			if (error) throw error;
			res.render(viewModel.pageTemplateName, viewModel);
		});
	});

	app.get('/reading/tags/:tagName', l.withSharedLayout(), function tag (req, res) {
		var tagName = req.params.tagName;
		s.getReadingTagViewModel(tagName, function (error, viewModel) {
			if (error) throw error;
			res.render(viewModel.pageTemplateName, viewModel);
		});
	});

}
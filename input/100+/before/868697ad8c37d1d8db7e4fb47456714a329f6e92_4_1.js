function(app) {

	var s = require('../lib/shared');

	/** GET /[index]
	 */
	app.get('/', function index (req, res) {
		s.getIndexViewModel(function (error, viewModel) {
			if (error) throw error;
			res.render(viewModel.pageTemplateName, viewModel);
		});
	});

	/** GET /posts/:id
	 */
	app.get('/posts/:id', function post (req, res) {
		var postId = req.params.id;
		s.getPostViewModel(postId, function (error, viewModel) {
			if (error) throw error;
			res.render(viewModel.pageTemplateName, viewModel);
		});
	});

	/** GET /twitter
	 */
	app.get('/twitter', function twitter (req, res) {
		s.getTwitterViewModel(function (error, viewModel) {
			res.render(viewModel.pageTemplateName, viewModel);
		});
	});

}
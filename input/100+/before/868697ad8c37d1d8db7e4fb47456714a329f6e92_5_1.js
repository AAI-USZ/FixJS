function index (req, res) {
		s.getReadingListViewModel(function (error, viewModel) {
			if (error) throw error;
			res.render(viewModel.pageTemplateName, viewModel);
		});
	}
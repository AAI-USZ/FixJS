function tag (req, res) {
		var tagName = req.params.tagName;
		s.getReadingTagViewModel(tagName, function (error, viewModel) {
			if (error) throw error;
			res.render(viewModel.pageTemplateName, viewModel);
		});
	}
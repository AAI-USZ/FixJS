function gotSharedViewModel(error, viewModel) {
			res.render(viewModel.pageTemplateName, viewModel);
		}
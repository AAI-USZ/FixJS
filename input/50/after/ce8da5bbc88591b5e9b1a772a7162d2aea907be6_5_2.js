function gotTagViewModel(error, viewModel) {
			if (error) throw error;
			res.render(viewModel.pageTemplateName, viewModel);
		}
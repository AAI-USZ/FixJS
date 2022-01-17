function(error, viewModel) {
			if (error) throw error;
			res.render('post', viewModel);
		}
function(req, res) {
		var postId = req.params.id;
		shared.getPostViewModel(postId, function(error, viewModel) {
			// TODO: handle error ?
			res.render('post', viewModel);
		});
	}
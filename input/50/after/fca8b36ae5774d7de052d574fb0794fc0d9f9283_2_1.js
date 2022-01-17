function(req, res) {
		var postId = req.params.id
		shared.getPostViewModel(postId, function(viewModel) {
			res.render('post', viewModel);
		});
	}
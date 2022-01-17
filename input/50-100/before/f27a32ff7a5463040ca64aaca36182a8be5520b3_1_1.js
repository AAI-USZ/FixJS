function(indexViewModel) {

			// find the post in the index view model cache
			var post = _.chain(indexViewModel.posts)
				.filter(function(post) { return post.id === req.params.id})
				.first()
				.value();

			callback(post);
		}
function(indexViewModel) {

		// find the post in the index view model cache
		var post = _.chain(indexViewModel.posts)
			.filter(function(post) { return post.id == postId})
			.first()
			.value();

		var postViewModel = { title: post.title, post: post, shared: getSharedViewModel('post') };
		callback(postViewModel);
	}
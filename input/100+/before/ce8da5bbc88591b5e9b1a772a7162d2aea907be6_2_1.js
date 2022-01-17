function gotIndexViewModel(getIndexError, model) {
		if (getIndexError) return callback(getIndexError);

		getSharedViewModel('post', function gotSharedViewModel(getSharedError, shared) {
			if (getSharedError) return callback(getSharedError);

			// find the post in the index view model cache
			var post = _.chain(model.posts)
				.filter(function (post) { return post.id == postId; })
				.first()
				.value();

			if (!post) throw new Error("unable to find post with id " + postId);

			callback(null, {
				title: post.title,
				post: post,
				shared: shared
			});
		});
	}
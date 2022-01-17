function getBlogPostsForUserCachedCb(error, posts) {
		if (error) {
			callback(error);
		} else {
			var viewModel = {
				posts: posts,
				shared: getSharedViewModel('home'),
				title: 'Rarely updated'
			};

			callback(null, viewModel);
		}
	}
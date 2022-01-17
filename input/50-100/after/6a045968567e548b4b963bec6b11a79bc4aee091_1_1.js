function refreshIndexViewModel(callback) {

		console.log('getting latest data from github: %s', JSON.stringify(getOptions));
		isRefreshingIndexViewModel = true;

		gists.getBlogPostsForUser(getOptions, function(posts) {
			lastGet = new Date();
			_indexViewModelCache.posts = posts;
			isRefreshingIndexViewModel = false;
			callback(_indexViewModelCache);
		});
	}
function getIndexViewModel(callback) {

	async.parallel({
			posts: asyncify(blogPostsForUserCache.get)
		},
		function gotIndexViewModelData(err, results) {
			if (err) return callback(err);

			var viewModel = buildIndexViewModel(results.posts);
			callback(err, viewModel);
		});
}
function checkUpdateCache() {
	// todo: this is crap, do it better
	var age = (new Date() - lastGet) / 60000;
	if (age > 5) {
		console.log('getting latest data from github');

		gists.getAllBlogPostsContent('adamchester', function(posts) {
			lastGet = new Date();
			viewModelCache.posts = posts;
		});
	}
}
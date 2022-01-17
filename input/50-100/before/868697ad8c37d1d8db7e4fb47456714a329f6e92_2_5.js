function buildPostViewModel(postId, indexViewModel, sharedViewModel) {

	// find the post in the index view model
	var post = _.chain(indexViewModel.posts)
		.filter(function (post) { return post.id == postId; })
		.first()
		.value();

	return sharedViewModel.extend({
		// override the title, post may not exist
		title: post ? post.title : sharedViewModel.currentTopLevelPage.title,
		post: post,
		pageTemplateName: 'post'
	});
}
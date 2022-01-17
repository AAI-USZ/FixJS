function buildPostViewModel(postId, indexViewModel) {

	// find the post in the index view model
	var post = _.chain(indexViewModel.posts)
		.filter(function (post) { return post.id == postId; })
		.first()
		.value();

	var title = post ? post.title : 'Post';
	var pageTemplateName = 'post';

	return new ViewModel(title, pageTemplateName)
		.extend({
			post: post
		});
}
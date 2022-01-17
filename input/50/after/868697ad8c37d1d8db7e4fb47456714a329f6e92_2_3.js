function buildIndexViewModel(posts) {
	var page = topLevelPages.index;

	return new ViewModel(page.title, page.pageTemplateName)
		.extend({
			posts: posts
		});
}
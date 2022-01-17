function buildReadingListViewModel(readingListItems) {
	var page = topLevelPages.reading;

	return new ViewModel(page.title, page.pageTemplateName)
		.extend({ items: readingListItems });
}
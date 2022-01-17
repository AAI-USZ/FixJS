function buildReadingTagViewModel(tagName, tag, readingListItemsForTag) {

	var title = 'Reading list for tag [' + tagName + ']';
	var pageTemplateName = 'reading_tag';

	return new ViewModel(title, pageTemplateName)
		.extend({
			tag: tag,
			items: readingListItemsForTag
		});
}
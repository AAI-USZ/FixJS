function buildReadingTagViewModel(tagName, readingListItemsForTag, sharedViewModel) {

	var tag = _.chain(sharedViewModel.readingListTags)
		.find(function (tag) { return tag.name === tagName; })
		.value();

	return sharedViewModel.extend({
		title: 'Reading list for tag [' + tagName + ']',
		tag: tag,
		items: readingListItemsForTag
	});
}
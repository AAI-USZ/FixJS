function SharedViewModel(currentTopLevelPage, readingListTags, additional) {

	if (!currentTopLevelPage) throw new Error('top level page must be defined');

	this.currentTopLevelPage = currentTopLevelPage;
	this.title = currentTopLevelPage.title;
	this.topLevelMenuItems = getTopLevelMenuItems(currentTopLevelPage);
	this.pageTemplateName = currentTopLevelPage.id;

	this.readingListTags = readingListTags;

	if (additional) {
		_.extend(this, additional);
	}

	this.extend = function(extendedModel) {
		return _.extend(this, extendedModel);
	};

	return this;
}
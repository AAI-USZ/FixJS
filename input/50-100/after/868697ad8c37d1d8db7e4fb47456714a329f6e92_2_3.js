function SharedViewModel(currentTopLevelPage, readingListTags, additional) {

	if (!currentTopLevelPage) throw new Error('top level page must be defined');

	// Inherit from ViewModel
	ViewModel.call(this, currentTopLevelPage.title, currentTopLevelPage.pageTemplateName);

	// SharedViewModel properties
	this.currentTopLevelPage = currentTopLevelPage;
	this.topLevelMenuItems = getTopLevelMenuItems(currentTopLevelPage);
	this.readingListTags = readingListTags;

	if (additional) {
		_.extend(this, additional);
	}

	return this;
}
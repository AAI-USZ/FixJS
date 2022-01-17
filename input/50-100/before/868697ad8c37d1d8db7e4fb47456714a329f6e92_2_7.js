function buildReadingListViewModel(readingListItems, sharedViewModel) {
	return sharedViewModel.extend({ items: readingListItems });
}
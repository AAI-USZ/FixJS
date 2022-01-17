function getUpdatedReadingList(originalReadingListItems, updatedReadingListItems) {
		// simulate 'updating' our reading list from the pocket API pocket.get({since:lastUpdated});
		// TODO: implement update by creating a new list, overwriting with original with updated values
		return [].concat.apply([], [originalReadingListItems, updatedReadingListItems]);
	}
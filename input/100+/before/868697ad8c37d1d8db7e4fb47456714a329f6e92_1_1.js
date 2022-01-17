function getUpdatedReadingList(originalReadingListItems, updatedReadingListItems) {
		// simulate 'updating' our reading list from the pocket API pocket.get({since:lastUpdated});
		// TODO: implement update by creating a new list, overwriting with original with updated values
		var combined = [].concat.apply([], [originalReadingListItems, updatedReadingListItems]);
		return _.chain(combined).sortBy(timeAdded).reverse().value();
	}
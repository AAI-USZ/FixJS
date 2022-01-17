function gotReadingList(error, readingListItems) {

		if (error) {
			callback(error);
		}
		else {
			callback(null, {
				title: 'Reading list',
				items: readingListItems,
				shared: getSharedViewModel('reading')
			});
		}
	}
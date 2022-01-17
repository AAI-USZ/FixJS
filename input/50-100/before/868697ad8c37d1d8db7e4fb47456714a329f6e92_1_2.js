function getReadingList(callback) {

		// TODO: connect to http://getpocket.com API instead
		var original =  toReadingListItems(require('../test/assets/reading_list.json'));
		var additional = toReadingListItems(require('../test/assets/reading_list_since.json').list);
		
		// process the latest changes (pocket.get({since:lastUpdated});
		var readingListModel = getUpdatedReadingList(original, additional);

		callback(null, readingListModel);
	}
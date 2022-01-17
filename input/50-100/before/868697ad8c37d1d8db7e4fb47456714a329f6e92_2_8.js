function getReadingListViewModel(callback) {

	async.parallel({
			readingListItems: rl.getReadingList,
			shared: asyncify(getSharedViewModel, topLevelPages.reading)
		},
		function onGotAsyncData(err, results) {
			if (err) return callback(err);

			var model = buildReadingListViewModel(
				results.readingListItems,
				results.shared);

			callback(null, model);
		});
}
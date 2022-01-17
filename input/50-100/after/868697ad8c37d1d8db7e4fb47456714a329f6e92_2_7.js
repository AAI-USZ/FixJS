function getReadingListViewModel(callback) {

	async.parallel({
			readingListItems: rl.getReadingList
		},
		function onGotAsyncData(err, results) {
			if (err) return callback(err);
			var model = buildReadingListViewModel(results.readingListItems);
			callback(null, model);
		});
}
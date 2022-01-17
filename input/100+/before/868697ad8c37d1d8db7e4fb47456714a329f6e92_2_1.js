function getReadingTagViewModel(tagName, callback) {

	async.parallel({
			readingListForTag: asyncify(rl.getReadingListForTag, tagName),
			shared: asyncify(getSharedViewModel, topLevelPages.reading)
		},
		function onGotAsyncData(err, results) {
			if (err) return callback(err);

			var model = buildReadingTagViewModel(
				tagName,
				results.readingListForTag,
				results.shared);

			if (!model.tag) return callback(new NotFoundError('The reading list tag ' + tagName + ' was not found'));

			callback(null, model);
		});
}
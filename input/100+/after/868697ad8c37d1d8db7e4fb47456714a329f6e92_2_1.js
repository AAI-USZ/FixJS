function getReadingTagViewModel(tagName, callback) {
	async.parallel({
			readingListForTag: asyncify(rl.getReadingListForTag, tagName),
			tag: asyncify(rl.getTag, tagName)
		},
		function onGotAsyncData(err, results) {
			if (err) return callback(err);
			var model = buildReadingTagViewModel(tagName, results.tag, results.readingListForTag);
			if (!model.tag) return callback(new NotFound('The reading list tag ' + tagName + ' was not found'));
			callback(null, model);
		});
}
function onGotAsyncData(err, results) {
			if (err) return callback(err);

			var model = buildReadingTagViewModel(
				tagName,
				results.readingListForTag,
				results.shared);

			if (!model.tag) return callback(new NotFoundError('The reading list tag ' + tagName + ' was not found'));

			callback(null, model);
		}
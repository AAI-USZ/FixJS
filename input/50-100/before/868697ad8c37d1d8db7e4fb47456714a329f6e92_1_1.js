function getReadingListForTag(tagName, callback) {
		getReadingList(function gotReadingList(error, model) {
			if (error) return callback(error);

			var itemsForTag = _.chain(model)
				.filter(function(item) { return _(item.tags).contains(tagName); })
				.value();

			callback(null, itemsForTag);
		});
	}
function gotReadingList(error, model) {
			if (error) return callback(error);

			var itemsForTag = _.chain(model)
				.filter(function(item) { return _(item.tags).contains(tagName); })
				.value();

			if (itemsForTag.length === 0) {
				return callback(new Error('The tag ' + tagName + ' was not found'));
			}

			callback(null, itemsForTag);
		}
function () {

	function Constructor() {
	}

	// see http://www.epochconverter.com/programming/#javascript
	function epochToDate(epoch) {
		return new Date(epoch * 1000.0);
	}

	function timeAdded(readingListItem) {
		return readingListItem.time_added;
	}

	function self(it) { return it; }

	function getMostRecentlyAddedDate(items) {
		return _.chain(items)
			.map(timeAdded)
			.max()
			.value();
	}

	function toTagItem(tagName) {
		return { href: '/reading/tags/' + tagName, name: tagName, classes: null };
	}

	function toReadingListItem(item) {
		return {
			id: Number(item.item_id),
			title: item.title || '[no title]',
			url: item.url,
			time_added: epochToDate(item.time_added),
			time_updated: epochToDate(item.time_updated),
			tags: item.tags ? item.tags.split(',') : [],
			isRead: item.state === 1
		};
	}

	function toReadingListItems(items) {
		return _.chain(items)
			.map(toReadingListItem)
			.sortBy(timeAdded)
			.reverse()
			.value();
	}

	function extractTags(readingListItems) {
		return _.chain(readingListItems)
			.map(function (item) { return item.tags; })
			.flatten()
			.uniq()
			.sortBy(self)
			.map(toTagItem)
			.value();
	}

	function getTags(callback) {

		getReadingList(function gotReadingList(error, model) {
			if (error) {
				return callback(error);
			}

			callback(null, extractTags(model));
		});
	}

	function getTag(tagName, callback) {

		getTags (function gotTags(error, model) {
			if (error) return callback(error);

			var tag = _(model).find(function (tag) { return tag.name === tagName; });

			if (!tag) {
				return callback(new Error('The tag ' + tagName + ' was not found'));
			}

			callback(null, tag);
		});
	}

	function getReadingListForTag(tagName, callback) {

		getReadingList(function gotReadingList(error, model) {
			if (error) return callback(error);

			var itemsForTag = _.chain(model)
				.filter(function(item) { return _(item.tags).contains(tagName); })
				.value();

			if (itemsForTag.length === 0) {
				return callback(new Error('The tag ' + tagName + ' was not found'));
			}

			callback(null, itemsForTag);
		});
	}

	function getUpdatedReadingList(originalReadingListItems, updatedReadingListItems) {
		// simulate 'updating' our reading list from the pocket API pocket.get({since:lastUpdated});
		// TODO: implement update by creating a new list, overwriting with original with updated values
		var combined = [].concat.apply([], [originalReadingListItems, updatedReadingListItems]);
		return _.chain(combined).sortBy(timeAdded).reverse().value();
	}

	function getReadingList(callback) {

		// TODO: connect to http://getpocket.com API instead
		var original =  toReadingListItems(require('../test/assets/reading_list.json'));
		var additional = toReadingListItems(require('../test/assets/reading_list_since.json').list);
		
		// process the latest changes (pocket.get({since:lastUpdated});
		var readingListModel = getUpdatedReadingList(original, additional);

		callback(null, readingListModel);
	}

	Constructor.prototype = {
		toTagItem: toTagItem,
		self: self,
		getTags: getTags,
		getTag: getTag,
		extractTags: extractTags,
		getReadingList: getReadingList,
		getReadingListForTag: getReadingListForTag,
		toReadingListItem: toReadingListItem,
		toReadingListItems: toReadingListItems,
		getMostRecentlyAddedDate: getMostRecentlyAddedDate
	};

	return Constructor;
}
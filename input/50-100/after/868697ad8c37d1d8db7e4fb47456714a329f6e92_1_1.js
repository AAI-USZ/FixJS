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
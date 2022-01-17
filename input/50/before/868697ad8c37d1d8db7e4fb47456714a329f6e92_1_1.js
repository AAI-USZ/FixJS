function gotReadingList(error, model) {
			if (error) {
				return callback(error);
			}

			callback(null, extractTags(model));
		}
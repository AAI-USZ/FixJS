function (e, category) {

			if (!!category && !!category.save) {
				category.latestGame = null;
				
				saveCategory(category, function(savedCategory) {
					eventEmitter.emit('latestGameWasClearedForCategory', savedCategory._id);
					if (!!callback) {
						callback(savedCategory);
					}
				});
			} else {
				if (!!callback) {
					callback(category);
				}
			}
		}
function(categoryId, callback) {
		Game.find({ 'category': categoryId }).populate('category').exec(function(err, games) {
			callback(games);
		});
	}
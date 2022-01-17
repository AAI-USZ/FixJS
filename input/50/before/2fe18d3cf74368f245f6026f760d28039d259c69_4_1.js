function(id, callback) {
		Game.findOne({ _id: id }, function(e, game) {
			callback(game);
		});
	}
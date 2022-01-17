function(games) {
				var mostRecentGame = _.max(games, function(current) { return current.played; });

				if (!!mostRecentGame) {
					eventEmitter.emit('updateLatestGame', { game: mostRecentGame, callback: function() {
						callback(savedGame);
					}});
				} else {
					callback(savedGame);
				}
			}
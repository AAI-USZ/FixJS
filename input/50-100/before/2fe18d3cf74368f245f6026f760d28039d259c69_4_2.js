function(games) {
				var mostRecentGame = _.max(games, function(current) { return current.played; })
				  , categoryId = savedGame.category;
				
				eventEmitter.emit('updateLatestGameForCategory', { categoryId: categoryId, game: mostRecentGame, callback: function() {
					callback(savedGame);
				}});
			}
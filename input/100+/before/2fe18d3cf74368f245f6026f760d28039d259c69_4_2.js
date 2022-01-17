function() {
	var addGame, establishDatabaseConnection, eventEmitter, eventHandling, Game, getAllGames, getGame, mongoose, saveGame, schema, _;
	
	eventHandling = require('../business/eventHandling')['eventHandling'];
	eventEmitter = eventHandling.getEventEmitter();
	_ = require('../libs/underscore');
	
	addGame = function(values, callback) {
		var game = new Game();
		
		game.home 		 = 	values.home;
		game.away 		 = 	values.away;
		game.homeScore 	 =  values.homeScore;
		game.awayScore 	 =  values.awayScore;
		game.overtimeWin = 	values.overtimeWin;
		game.shootoutWin = 	values.shootoutWin;
		game.played 	 = 	values.played;
		game.season 	 = 	values.season;
		game.category 	 = 	values.category;
		game.arena 	 	 = 	values.arena;
		
		if (+game.homeScore !== +game.awayScore) {
			game.winner = game.homeScore > game.awayScore ? game.home : game.away;
		} else {
			game.winner = [];
		}
		
		saveGameAndEmitEvent(game, callback);
	};
	
	establishDatabaseConnection = function(connection) {
		schema = require('../db/schemas')["schemas"].gameSchema;
		Game = connection.model('game', schema);
	};
	
	getAllGames = function(callback) {
		Game.find({}, function(err, games) {
			callback(games);
		});
	};
	
	getGame = function(id, callback) {
		Game.findOne({ _id: id }, function(e, game) {
			callback(game);
		});
	};
	
	getModel = function() {
		return Game;
	}
	
	removeGame = function(game, callback) {
		Game.find({ _id: game._id }).remove(function() {
			eventEmitter.emit('gameWasRemoved', game._id);
			callback();
		});
	};
	
	saveGame = function(game, callback) {
		getGame(game._id, function(existingGame) {
			if (!!existingGame) {
				existingGame.home 		 = game.home;
				existingGame.away 		 = game.away;
				existingGame.homeScore 	 = game.homeScore;
				existingGame.awayScore 	 = game.awayScore;
				existingGame.overtimeWin = game.overtimeWin;
				existingGame.shootoutWin = game.shootoutWin;
				existingGame.played 	 = game.played;
				existingGame.season 	 = game.season;
				existingGame.category 	 = game.category;
				existingGame.arena 	 	 = game.arena;
				
				if (+existingGame.homeScore !== +existingGame.awayScore) {
					existingGame.winner = existingGame.homeScore > existingGame.awayScore ? existingGame.home : existingGame.away;
				} else {
					existingGame.winner = [];
				}
				
				saveGameAndEmitEvent(existingGame, callback);
				
			} else {
				addGame(game, callback);
			}
		});
	};
	
	function saveGameAndEmitEvent(game, callback) {
		game.save(function(e, savedGame) {
			getAllGames(function(games) {
				var mostRecentGame = _.max(games, function(current) { return current.played; })
				  , categoryId = savedGame.category;
				
				eventEmitter.emit('updateLatestGameForCategory', { categoryId: categoryId, game: mostRecentGame, callback: function() {
					callback(savedGame);
				}});
			});
		});
	}
	
	return {
	  	addGame: addGame
	  ,	establishDatabaseConnection: establishDatabaseConnection
	  , getAllGames: getAllGames
	  ,	getGame: getGame
	  , getModel: getModel
	  , removeGame: removeGame
	  , saveGame: saveGame
	};
}
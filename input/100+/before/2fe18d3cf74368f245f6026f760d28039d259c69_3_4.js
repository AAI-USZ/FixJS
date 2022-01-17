function() {
	var addCategory, addTeamToCategory, Category, checkLatestGame, establishDatabaseConnection, eventEmitter, eventHandling, 
	getAllCategories, getAllDivisions, getAllLeagues, getAllSports, getCategoryById, getCategoryByRoute, getModel, mongoose, 
	removeTeamFromCategory, saveCategory, updateLatestGame, _;
	
	eventHandling = require('../business/eventHandling')['eventHandling'];
	eventEmitter = eventHandling.getEventEmitter();
	_ = require('../libs/underscore');
	
	addCategory = function(props, callback) {
		var category = new Category();
		
		category.sport = props.sport; 
		category.league = props.league;
		category.division = props.division;
		category.route = props.route;
		category.starts = props.starts;
		category.ends = props.ends;
		category.latestGame = props.latestGame;
		category.teams = props.teams;
		
		category.matchup = getMatchupFromTeams(category.teams);
		
		category.save(function(e, savedCategory) {
			callback(savedCategory);
		});
	};
	
	addTeamToCategory = function(category, team, callback) {

		category.teams.push(team);
		category.matchup = getMatchupFromTeams(category.teams);
		category.save(function() {
			callback();
		})
	};
	
	checkLatestGame = function(gameId, callback) {
		Category.findOne({ 'latestGame._id': gameId }, function (e, category) {
			
			if (!!category && !!category.save) {
				category.latestGame = null;
				category.save(function(e, savedCategory) {
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
		});
	};
	
	establishDatabaseConnection = function(connection) {
		var schema = require('../db/schemas')["schemas"].categorySchema;
		Category = connection.model('category', schema);
	};
	
	getAllCategories = function(callback) {
		Category.find({}, function(err, categories) {
			callback(categories);
		});
	};
		
	getAllDivisions = function(callback) {
		Category.find({}, 'division', function (e, divisions){
			var uniqueResults = _.uniq(_.pluck(divisions, 'division')); //todo: super lame but mongoose distinct just didnt work, why?			
			callback(uniqueResults);
		});
	};
	
	getAllLeagues = function(callback) {
		Category.find({}, 'league', function(e, leagues) {
			var uniqueResults = _.uniq(_.pluck(leagues, 'league'));
			callback(uniqueResults);
		});
	};
	
	getAllSports = function(callback) {
		Category.find({}, 'sport', function(e, sports) {
			var uniqueResults = _.uniq(_.pluck(sports, 'sport'));
			callback(uniqueResults);
		});
	};
	
	getCategoryById = function(id, callback) {
		Category.findOne({ _id: id }, function(err, category) {
			callback(category);
		});
	};
	
	getCategoryByRoute = function(route, callback) {
		Category.findOne({ route: route }, function(err, category) {
			callback(category);
		});
	};
	
	getModel = function() {
		return Category;
	};
	
	removeTeamFromCategory = function(category, team, callback) {
		
		category.teams = _.without(category.teams, team);				
		category.matchup = getMatchupFromTeams(category.teams);
		category.save(function() {
			callback();
		});
	};
	
	saveCategory = function(category, callback) {
		
		getCategoryById(category._id, function(existingCategory) {	
			if (!!existingCategory) {
				existingCategory.sport 		= category.sport; 
				existingCategory.league 	= category.league;
				existingCategory.division 	= category.division;
				existingCategory.route 		= category.route;
				existingCategory.starts 	= category.starts;
				existingCategory.ends 		= category.ends;
				existingCategory.latestGame = category.latestGame;
				existingCategory.teams 		= category.teams;

				existingCategory.matchup = getMatchupFromTeams(category.teams);
				
				existingCategory.save(function(e, savedCategory) {
					callback(savedCategory);
				});
			} else {
				addCategory(category, callback);
			}
		});
	};
	
	updateLatestGame = function(params, callback) {
		
		getCategoryById(params.categoryId, function(category) {
			var savedGameIsLatestGame = !!category && !!category.latestGame && category.latestGame._id && category.latestGame._id.toString() === params.game._id.toString()
			  , savedGameIsNewerThanCurrentLatestGame =  !!category && (!category.latestGame.played || category.latestGame.played < params.game.played);
			
			if (savedGameIsLatestGame) {
				category.latestGame.played 		= params.game.played;
				category.latestGame.homeScore 	= params.game.homeScore;
				category.latestGame.awayScore 	= params.game.awayScore;
				
				if (+category.latestGame.homeScore !== +category.latestGame.awayScore) {
					category.latestGame.winner = category.latestGame.homeScore > category.latestGame.awayScore ? category.latestGame.home : category.latestGame.away;
				} else {
					category.latestGame.winner = [];
				}
				
				category.save(function(e, updatedCategory) {
					if (!!callback) {
						callback(updatedCategory);
					}
				});				
			} else if (savedGameIsNewerThanCurrentLatestGame) {
					category.latestGame = params.game;

					category.save(function(e, updatedCategory) {
						if (!!callback) {
							callback(updatedCategory);
						}
					});
			} else {
				if (!!callback) {
					callback(category);
				}	
			}
		});
	};
	
	function getMatchupFromTeams(teams) {
		return _.pluck(teams, 'abbr').join('');
	}
	
	eventEmitter.on('updateLatestGameForCategory', function(params) {
		getAllCategories(function(categories) {			
			updateLatestGame(params, params.callback);
		});
	});
	
	eventEmitter.on('gameWasRemoved', function(params) {
		checkLatestGame(params.gameId, params.callback);
	});
	
	return {
	  	addCategory: addCategory
	  ,	addTeamToCategory: addTeamToCategory
	  , checkLatestGame: checkLatestGame
	  ,	establishDatabaseConnection: establishDatabaseConnection
	  , getAllCategories: getAllCategories
	  , getAllDivisions: getAllDivisions
	  , getAllLeagues: getAllLeagues
	  , getAllSports: getAllSports
	  ,	getCategoryById: getCategoryById
	  , getCategoryByRoute: getCategoryByRoute
	  , getModel: getModel	
	  , removeTeamFromCategory: removeTeamFromCategory
	  , saveCategory: saveCategory
	  , updateLatestGame: updateLatestGame
	}
}
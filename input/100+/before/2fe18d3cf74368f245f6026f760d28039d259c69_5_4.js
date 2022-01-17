function() {
	var mongoose = require('mongoose')  
	  , should = require('should')
	  , connection = mongoose.createConnection('mongodb://localhost/nodentia_test_db')
	  , _ = require('../libs/underscore')
	  , category = require('../models/category')['category']
	  , game = require('../models/game')['game']
	  , team = require('../models/team')['team']
	  , eventHandling = require('../business/eventHandling')['eventHandling']
	  , eventEmitter = eventHandling.getEventEmitter()
	  , testCategory;
	
	category.establishDatabaseConnection(connection);
	
	beforeEach(function(done) {
		team.addTeam({ abbr: 'T1', name: 'Team1'}, function(t1) {
			team.addTeam({ abbr: 'T2', name: 'Team2'}, function(t2) {						
				game.addGame({ home: t1, away: t2, played: new Date('2012-03-01'), homeScore: 2, awayScore: 1 }, function(newGame) {
					category.addCategory({ sport: 'Ping Pong', league: 'Ping Pong League', division: 'Men', route: '/c/pingpong', teams: [t1, t2], starts: new Date('2012-01-01'), ends: new Date('2012-12-31'), latestGame: newGame }, function(newCategory) {
						testCategory = newCategory;
						done();	
					});
				});
			});
		});
	});	
	
	afterEach(function(done) {
		var teamModel = team.getModel()
		  ,	categoryModel = category.getModel(); 
		
		testCategory = {};
		
		categoryModel.remove({}, function() {			
			teamModel.remove({}, function() {
				done();
			});
		});
	});
	
	it('can add a category', function(done) {
		testCategory.sport.should.equal('Ping Pong');
		testCategory.league.should.equal('Ping Pong League');
		testCategory.division.should.equal('Men');
		testCategory.route.should.equal('/c/pingpong');
		testCategory.teams.length.should.equal(2);
		testCategory.starts.should.equal(new Date('2012-01-01'));
		testCategory.ends.should.equal(new Date('2012-12-31'));
		
		done();
	});
	
	it('can edit a category', function(done) {
		var id = testCategory._id;
		
		testCategory.sport.should.equal('Ping Pong');
		testCategory.sport = 'Table Tennis';
		
		category.saveCategory(testCategory, function(savedCategory) {
			savedCategory.sport.should.equal('Table Tennis');
			savedCategory._id.toString().should.equal(id.toString());
			done();
		});
	});
	
	it('can get a category by id', function(done) {
		category.getCategoryById(testCategory._id, function(fetchedCategory){
			fetchedCategory.should.not.be.null;
			fetchedCategory._id.toString().should.equal(testCategory._id.toString());
			done();
		});
	});
	
	it('can get a category by route', function(done) {
		category.getCategoryByRoute('/c/pingpong', function(fetchedCategory) {
			fetchedCategory.should.not.be.null;
			fetchedCategory.route.should.equal('/c/pingpong');
			done();
		});
	});
	
	it('can get all categories', function(done) {
		category.getAllCategories(function(categories){
			categories.should.be.an.instanceOf(Array);
			categories.length.should.equal(1);
			done();
		});
	});
	
	it('removes team from category', function(done) {
		done();
	});
	
	it('can get all divisions', function(done) {
		category.getAllDivisions(function(divisions) {
			divisions.should.not.be.empty;
			done();
		});
	});
	
	it('can get all leagues', function(done) {
		category.getAllLeagues(function(leagues) {
			leagues.should.not.be.empty;
			done();
		});
	});
	
	it('can get all sports', function(done) {
		category.getAllSports(function(sports) {
			sports.length.should.not.equal(0);
			sports.should.include('Ping Pong');
			done();
		});
	});
	
	it('can add a team', function(done) {
		
		team.addTeam({ abbr: 'T3', name: 'Team3'}, function(t3) {
			testCategory.teams.push(t3);
			
			testCategory.save(function(e, savedCategory) {
				savedCategory.teams.should.not.be.empty;
				done();
			});
		});
	});

	it('can remove a team', function(done) {
		var team1 = testCategory.teams[0];
		
		testCategory.teams = _.without(testCategory.teams, team1);	
		testCategory.save(function(e, savedCategory) {
			savedCategory.teams.should.not.include(team1);
			done();
		});
	});
	
	it('adds a new category when it is saved but doesnt exist', function(done) {
		var newCategory = new category.getModel();
		newCategory.sport = 'Table Tennis';
		
		newCategory.should.not.have.property('_id');
		
		category.saveCategory(newCategory, function(savedCategory) {
			savedCategory._id.should.exist;
			savedCategory.sport.should.equal('Table Tennis');
			done();
		});
	});
	
	it('updates matchup when a team is added', function (done) {
		testCategory.matchup.should.equal('T1T2');
		
		team.addTeam({ abbr: 'T3', name: 'Team3'}, function(t3) {
			category.addTeamToCategory(testCategory, t3, function() {
				category.getCategoryById(testCategory._id, function(savedCategory) {
					savedCategory.matchup.should.equal('T1T2T3');
					done();
				});
			});
		});
	});
	
	it('updates matchup when a team is removed', function(done) {
		testCategory.matchup.should.equal('T1T2');
		
		category.removeTeamFromCategory(testCategory, testCategory.teams[0], function() {
			category.getCategoryById(testCategory._id, function(savedCategory) {
				savedCategory.matchup.should.equal('T2');
				done();
			});
		});
	});
	
	it('updates latestGame if an added game is more recent', function(done) {

		game.getGame(testCategory.latestGame, function(initialGame) {
			initialGame.played.should.equal(new Date('2012-03-01'));
			
			game.addGame({ played: new Date('2012-03-05') }, function(newGame) {
				eventEmitter.emit('updateLatestGameForCategory', { categoryId: testCategory._id, game: newGame, callback: function(updatedCategory) {
					updatedCategory.latestGame._id.should.equal(newGame._id);
					updatedCategory.latestGame.played.should.equal(newGame.played);
					done();
				} });
			});
		});
	});
	
	it('updates latestGame when the current latest game is edited', function(done) {
		game.getGame(testCategory.latestGame, function(latestGame) { 
			latestGame.homeScore.should.equal(2);
			latestGame.winner[0].abbr.should.equal('T1');
			
			latestGame.homeScore = 0;
			
			eventEmitter.emit('updateLatestGameForCategory', { categoryId: testCategory._id, game: latestGame, callback: function(updatedCategory) {
				updatedCategory.latestGame.homeScore.should.equal(0);
				updatedCategory.latestGame.winner[0].abbr.should.equal('T2');
				done();
			}});
		});
	});
	
	it('does not update latestGame if the game is not most recent when such an event is emitted', function(done) {
		game.getGame(testCategory.latestGame, function(initialGame) {
			initialGame.played.should.equal(new Date('2012-03-01'));
			
			game.addGame({ played: new Date('2012-02-28') }, function(newGame) {
				eventEmitter.emit('updateLatestGameForCategory', { categoryId: testCategory._id, game: newGame, callback: function(updatedCategory) {
					updatedCategory.latestGame._id.should.not.equal(newGame._id);
					updatedCategory.latestGame.played.should.equal(initialGame.played);
					done();
				}});
			});
		});
	});
	
	it('clears latestGame when such an event is emitted', function (done) {
		testCategory.latestGame.should.not.be.null;
		
		eventEmitter.emit('gameWasRemoved', { gameId: testCategory.latestGame._id, callback: function(returnedCategory) {
			returnedCategory.latestGame.should.be.null;	
			done();
		}});
	});
}
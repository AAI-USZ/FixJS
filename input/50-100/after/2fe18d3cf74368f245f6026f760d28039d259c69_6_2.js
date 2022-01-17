function(newGame) {
				
			game.getAllGames(function(games) {
				games.length.should.be.above(1);
				done();
			});
		}
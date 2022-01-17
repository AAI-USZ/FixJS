function(done) {
		game.addGame({ homeScore: 2, awayScore: 1, overtimeWin: false, shootoutWin: true, 
			played: new Date('2012-01-01'), season: '2012', arena: 'Buddy Arena' }, function(newGame) {
				
			game.getAllGames(function(games) {
				games.length.should.be.above(1);
				done();
			});
		});
	}
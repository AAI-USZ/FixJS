function(cat) {
					
					game.addGame({ home: t1, away: t2, homeScore: 2, awayScore: 1, overtimeWin: false, shootoutWin: true, played: new Date('2012-01-01'), season: '2012', category: cat, arena: 'Buddy Arena' }, function(newGame) {								
						testGame = newGame;
						done();
					});
				}
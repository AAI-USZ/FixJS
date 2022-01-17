function(newGame) {
					category.addCategory({ sport: 'Ping Pong', league: 'Ping Pong League', division: 'Men', route: '/c/pingpong', teams: [t1, t2], starts: new Date('2012-01-01'), ends: new Date('2012-12-31'), latestGame: newGame }, function(newCategory) {
						testCategory = newCategory;
						done();	
					});
				}
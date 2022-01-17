function(t2) {															
				category.addCategory({ sport: 'Ping Pong', league: 'Ping Pong League', division: 'Men', route: '/c/pingpong', teams: [t1, t2], starts: new Date('2012-01-01'), ends: new Date('2012-12-31') }, function(newCategory) {
					game.addGame({ home: t1, away: t2, played: new Date('2012-03-01'), homeScore: 2, awayScore: 1, category: newCategory }, function(newGame) {						
						testGame = newGame;
						testCategory = newCategory;
						testCategory.latestGame = newGame;
						
						category.saveCategory(testCategory, function() {							
							done();	
						});
					});
				});
			}
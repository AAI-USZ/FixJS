function(initialGame) {
			initialGame.played.should.equal(new Date('2012-03-01'));
			
			initialGame.played = new Date('2012-02-28');
			
			game.addGame(initialGame, function(newGame) {
				eventEmitter.emit('updateLatestGame', { game: newGame, callback: function(updatedCategory) {
					updatedCategory.latestGame.should.not.equal(newGame._id);					
					updatedCategory.latestGame.played.should.equal(new Date('2012-03-01'));
					done();
				}});
			});
		}
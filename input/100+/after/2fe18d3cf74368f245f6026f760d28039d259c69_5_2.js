function(initialGame) {
			initialGame.played.should.equal(new Date('2012-03-01'));
			
			testGame.played = new Date('2012-03-06');
			
			game.addGame(testGame, function(newGame) {
				eventEmitter.emit('updateLatestGame', { game: newGame, callback: function(updatedCategory) {
					updatedCategory.latestGame._id.toString().should.equal(newGame._id.toString());
					updatedCategory.latestGame.played.should.equal(newGame.played);
					done();
				} });
			});
		}
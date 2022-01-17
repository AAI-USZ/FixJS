function(newGame) {
				eventEmitter.emit('updateLatestGameForCategory', { categoryId: testCategory._id, game: newGame, callback: function(updatedCategory) {
					updatedCategory.latestGame._id.should.equal(newGame._id);
					updatedCategory.latestGame.played.should.equal(newGame.played);
					done();
				} });
			}
function(newGame) {
				eventEmitter.emit('updateLatestGameForCategory', { categoryId: testCategory._id, game: newGame, callback: function(updatedCategory) {
					updatedCategory.latestGame._id.should.not.equal(newGame._id);
					updatedCategory.latestGame.played.should.equal(initialGame.played);
					done();
				}});
			}
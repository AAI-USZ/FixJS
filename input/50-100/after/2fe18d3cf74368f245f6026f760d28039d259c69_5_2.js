function (done) {
		testCategory.latestGame.should.not.be.null;	
		
		eventEmitter.emit('gameWasRemoved', { gameId: testCategory.latestGame, callback: function(returnedCategory) {
			returnedCategory.should.have.property('latestGame', null);	
			done();
		}});
	}
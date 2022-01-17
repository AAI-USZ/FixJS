function(game1) {
	    underTest.init('fend', function(game2) {
		assert.equal(false, game1 == game2);		
	    });
	}
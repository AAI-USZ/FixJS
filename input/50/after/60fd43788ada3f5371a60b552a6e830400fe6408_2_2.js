function(game1) {
	    underTest.init('fend', [0,0,0], function(game2) {
		assert.equal(false, game1 == game2);		
	    });
	}
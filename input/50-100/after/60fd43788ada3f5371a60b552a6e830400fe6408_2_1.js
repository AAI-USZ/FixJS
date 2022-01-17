function() {
	var underTest = before();
	underTest.init('nick', [0,0,0], function(gameId) {
	    underTest.findGame(gameId, function(obj) {
		assert.equal('nick', obj.nickname);
	    });
	});
    }
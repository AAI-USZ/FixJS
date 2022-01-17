function() {
	var underTest = before();
	underTest.init('nick', function(gameId) {
	    underTest.findGame(gameId, function(obj) {
		assert.equal('nick', obj.nickname);
	    });
	});
    }
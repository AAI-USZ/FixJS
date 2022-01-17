function() {
        expect(4);
        assert.deepEqual(azusaar.util.splitKeyword(null), []);
        assert.deepEqual(azusaar.util.splitKeyword(""), []);
        assert.deepEqual(azusaar.util.splitKeyword("Google App Engine"), ["Google","App","Engine"]);
        assert.deepEqual(azusaar.util.splitKeyword("Google　App　Engine"), ["Google","App","Engine"]);
    }
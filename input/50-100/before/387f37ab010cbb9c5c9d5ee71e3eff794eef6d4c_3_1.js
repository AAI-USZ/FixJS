function() {
        expect(4);
        assert.strictEqual(azusaar.util.splitKeyword(null), "");
        assert.strictEqual(azusaar.util.splitKeyword(""), "");
        assert.deepEqual(azusaar.util.splitKeyword("Google App Engine"), ["Google","App","Engine"]);
        assert.deepEqual(azusaar.util.splitKeyword("Google　App　Engine"), ["Google","App","Engine"]);
    }
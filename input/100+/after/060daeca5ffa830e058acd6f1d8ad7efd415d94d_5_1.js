function() {

    it("be able to extend itself with new attributes", function() {
        
        var t = new Tilekit.Tile({
            x: 5,
            y: 7
        });

        t.x.should.equal(5);
        t.y.should.equal(7);
        
    });

    describe("methods", function() {

        var tile = new Tilekit.Tile({
                x: 7.2,
                y: 8.1,
                width: 32,
                height: 32
            });
        
        it("#isTraversable", function() {
            tile.isTraversable().should.equal(true);
        });

        it("#isBlocking", function() {
            tile.isBlocking().should.equal(false);
        });

        it("#roundedTile", function() {

            var rounded = tile.roundedTile();

            rounded.x.should.equal(7);
            rounded.y.should.equal(8);

        });

    });

}
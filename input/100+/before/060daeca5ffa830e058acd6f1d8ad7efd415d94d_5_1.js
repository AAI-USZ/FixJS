function() {

    it("be able to extend itself with new attributes", function() {
        
        var t = new Tilekit.Tile({
            x: 5,
            y: 7
        });

        t.x.should.equal(5);
        t.y.should.equal(7);
        
    });
}
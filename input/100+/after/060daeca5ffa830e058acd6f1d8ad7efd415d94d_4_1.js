function() {
        
        it("#findCenter", function() {

            var center = grid.findCenter(),
                size   = grid.get("size") / 2;

            center.x.should.equal( (grid.canvas.width / 2) - 16);
            center.y.should.equal( (grid.canvas.height / 2) - 16);
        });

        it("#getTileAt", function() {
            var tile =grid.getTileAt(0,0);

            tile.x.should.equal(0);
            tile.y.should.equal(0);
        });

        it("#calculateTileOffset", function() {
            var offset = grid.calculateTileOffset(1);
            offset.x.should.equal(32);
            offset.y.should.equal(0);
        });

        it("#calculatePixelOffset");

    }
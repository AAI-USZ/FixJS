function() {
        
        grid.on("ready", function() {
            (grid.tilemap[0][0] instanceof window.Tilekit.Tile).should.equal(true);
        });

    }
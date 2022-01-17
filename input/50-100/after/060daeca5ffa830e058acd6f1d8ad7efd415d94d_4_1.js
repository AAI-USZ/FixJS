function() {

            var center = grid.findCenter(),
                size   = grid.get("size") / 2;

            center.x.should.equal( (grid.canvas.width / 2) - 16);
            center.y.should.equal( (grid.canvas.height / 2) - 16);
        }
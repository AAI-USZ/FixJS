function() {

        var grid = new Tilekit.Grid(document.createElement("canvas"), {
            tileset : "images/tileset.png",
            data    : "000100\n010000\n010000"
        });
        
        grid.on("ready", function() {
            var course = grid.plotCourse({ x: 2, y: 2 }, { x: 1, y: 1 });
            course.should.deep.equal([90, 180]);
        });

    }
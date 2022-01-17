function() {

    var Tilekit = window.Tilekit;
    
    var grid = new Tilekit.Grid(document.createElement("canvas"), {
        tileset : "images/tileset.png",
        data    : "000100\n010000\n010000"
    });

    it("should have tiles", function() {
        
        grid.on("ready", function() {
            (grid.tilemap[0][0] instanceof window.Tilekit.Tile).should.equal(true);
        });

    });

    it("can encode an array", function() {
        
        grid.on('ready', function() {
            grid.encode([1,2,3,4]).should.equal("01020304");
        });

    });

    it("can find its center");
    it("can convert pixel values into tile positions");
    it("can calculate the value of a tile given an ex and y value");
    it("can calculate the spritesheet offset of a given slot");
    it("can calculate the pixel offset of a tile");

    // Manage Refreshing
    // -------------------------------------------------- //
    
    it("can start a gameloop");
    it("can pause its gameloop");
    it("can resume its gameloop");

    // Rendering
    // -------------------------------------------------- //

    it("can draw");
    it("can save its current state");


    // Pathfinding
    // -------------------------------------------------- //

    it("can plot a course using A*", function() {

        var grid = new Tilekit.Grid(document.createElement("canvas"), {
            tileset : "images/tileset.png",
            data    : "000100\n010000\n010000"
        });
        
        grid.on("ready", function() {
            var course = grid.plotCourse({ x: 2, y: 2 }, { x: 1, y: 1 });
            course.should.deep.equal([90, 180]);
        });

    });

    it("has portals");
    it("emits a portal event");
    
}
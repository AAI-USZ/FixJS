function() {
        var cCanvas = document.createElement("canvas"),
            cContext = cCanvas.getContext("2d"),
            fullWidth = tileSize.Width * gridSize.Width,
            fullHeight = tileSize.Height * gridSize.Height;
            //scale = new a2d.Vector(miniSize.Width / fullWidth, miniSize.Height / fullHeight);
        cCanvas.width = fullWidth;
        cCanvas.height = fullHeight;
        for(var x = 0; x < gridSize.Width; x++) {
            for(var y = 0; y < gridSize.Height; y++) {
                tiles[x][y].draw(cCanvas);
            }
        }
        return new a2d.Tile(cCanvas);
    }
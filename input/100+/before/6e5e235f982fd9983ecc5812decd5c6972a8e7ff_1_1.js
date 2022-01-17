function (data) {
        var x = 0, y = 0, tileCount = 0;
        gridSize = new a2d.Dimension(data.gridSize[0], data.gridSize[1]);
        tileSize = new a2d.Dimension(data.tileSize[0], data.tileSize[1]);
        for(y = 0; y < gridSize.Height; y++) {         
            for(x = 0; x < gridSize.Width; x++) {
                if (!tiles[x]) { 
                    tiles[x] = [];
                }                    
                tiles[x][y] = new a2d.Tile(a2d.resources[data.tileSet]);
                tiles[x][y].tileSize = tileSize;
                tiles[x][y].setTile(data.tiles[tileCount]);
                tiles[x][y].parent = this;
                if(data.tiles[tileCount] !== -1) {
                   tiles[x][y].edit = true;
                }            
                tiles[x][y].position = new a2d.Position((x * tileSize.Width / 2) - y * (tileSize.Width / 2), (y * tileSize.Height / 2) + x * tileSize.Height / 2);
                tileCount++;
            }
        }
        //console.log(tileCount);
    }
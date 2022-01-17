function(tile) {
            
            var y = round(tile.y),
                x = round(tile.x);
            
            return this.tilemap[y][x].isBlocking();

        }
function(tile) {
            return this.tilemap[tile.y][tile.x].isBlocking();
        }
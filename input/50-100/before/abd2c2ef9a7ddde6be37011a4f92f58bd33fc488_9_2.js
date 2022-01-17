function(tile, callback) {

        var tile2;

        for (var c in this.units) {
            
            if (this.units.hasOwnProperty(c) ) {
                
                tile2 = this.units[c].tile();

                if (tile.x === tile2.x && tile.y === tile2.y) {
                    
                    if (callback) {
                        callback(this.units[c]);
                    } else {
                        return this.units[c];
                    }
                }

            }

        }

    }
function(x, y, layer, slot) {

            var size = this.get("size"),
                tile;

            // Handle missing rows
            if (!this.tilemap[y]) {
                this.tilemap[y] = [];
            }

            if (!this.tilemap[y][x]) {
                this.tilemap[y][x] = new Tile(x, y, size, size);
            }

            tile = this.tilemap[y][x];

            tile.layers[layer] = slot;

            this.drawTile(tile);
            
            return this;
        }
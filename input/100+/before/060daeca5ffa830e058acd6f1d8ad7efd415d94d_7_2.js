function(x, y, layer, slot) {

            var size = this.get("size");

            // Handle missing rows
            if (!this.tilemap[y]) {
                this.tilemap[y] = [];
                this.tilemap[y][x] = new Tile(x, y, size, size);
            }

            this.tilemap[y][x][layer] = slot;

            this.drawTile({ x: x, y: y});

        }
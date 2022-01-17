function drawTile(tile, layerOffset) {

            tile = tile.roundedTile();

            var te      = this,
                size    = this.get('size'),
                center  = te.findCenter(),
                current = layerOffset || 0,
                sprite  = te.tileSprite,
                layers  = this.tile.layers,
                offset, value;

            sprite.setPosition(tile.x * size, tile.y * size);

            this.baseCtx.clearRect(tile.x * size, tile.y * size, size, size);

            do {

                if (!layers[current][tile.y]) {
                    layers[current][tile.y] = [];
                }

                value = layers[current];
                offset = this.calculateTileOffset(value);
                sprite.setOffset(offset.x, offset.y);
                sprite.draw(this.baseCtx);

                current++;

            } while(layers[current]);

        }
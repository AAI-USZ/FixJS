function(ctx) {
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                ctx.fillStyle = this.tiles[[x,y].join(',')].getColor();
                ctx.fillRect(x * (TILE_SIZE + 1) + 1,
                             y * (TILE_SIZE + 1) + 1,
                             TILE_SIZE, TILE_SIZE);
            }
        }
        if (this.room.isComplete()) {
            $('#win').show('fast');
        }
        else {
            $('#win').hide();
        }
    }
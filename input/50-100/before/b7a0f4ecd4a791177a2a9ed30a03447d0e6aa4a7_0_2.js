function(ctx) {
        this.room.draw(ctx);
        var x = this.location[0], y = this.location[1];
        ctx.fillStyle = RED;
        ctx.fillRect(x * (TILE_SIZE + 1) + 1,
                     y * (TILE_SIZE + 1) + 1,
                     TILE_SIZE, TILE_SIZE);
    }
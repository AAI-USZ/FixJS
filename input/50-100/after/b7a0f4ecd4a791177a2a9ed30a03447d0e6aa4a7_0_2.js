function(context) {
        this.room.draw(context);
        var x = this.location[0], y = this.location[1];
        context.fillStyle = RED;
        context.fillRect(x * (TILE_SIZE + 1) + 1,
                         y * (TILE_SIZE + 1) + 1,
                         TILE_SIZE, TILE_SIZE);
    }
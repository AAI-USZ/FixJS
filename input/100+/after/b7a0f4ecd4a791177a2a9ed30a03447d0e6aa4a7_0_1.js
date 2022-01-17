function Room($status, size, obstacles) {
    this.$status = $status;
    this.width = size[0];
    this.height = size[1];
    if (typeof obstacles === 'undefined') {
        max_obstacles = Math.floor(this.width * this.height / 32);
        obstacles = 1 + Math.floor(Math.random() * max_obstacles);
    }
    this.active_tiles = 0;
    this.active_tiles_max = this.width * this.height - obstacles;

    // Create tiles
    this.tiles = {};
    for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
            this.tiles[[x,y].join(',')] = new Tile();
        }
    }

    // Create obstacles
    while (obstacles > 0) {
        var location = [
            Math.floor(Math.random() * this.width),
            Math.floor(Math.random() * this.height),
        ];
        var blocked = this.tiles[location.join(',')].block();
        if (blocked) {
            obstacles--;
        }
    }
}
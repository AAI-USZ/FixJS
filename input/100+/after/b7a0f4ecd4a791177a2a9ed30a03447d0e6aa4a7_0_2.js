function() {
        for (var key in this.tiles) {
            this.tiles[key].deactivate();
        }
        this.active_tiles = 0;
    }
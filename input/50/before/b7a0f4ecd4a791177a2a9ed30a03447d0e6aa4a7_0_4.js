function(location) {
        this.tiles[location.join(',')].deactivate();
        this.active_tiles--;
    }
function() {
        for (var key in this.tiles) {
            this.tiles[key].deactivate();
        }
    }
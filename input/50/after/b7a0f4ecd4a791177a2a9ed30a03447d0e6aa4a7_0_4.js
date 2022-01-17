function(location) {
        var deactivated = this.tiles[location.join(',')].deactivate();
        if (deactivated) {
            this.active_tiles--;
        }
        return deactivated;
    }
function(direction) {
        var dx = direction[0], dy = direction[1];
        var new_location = [this.location[0] + dx,
                            this.location[1] + dy];
        this.room.activate(new_location);
        this.location = new_location;
        this.draw(ctx);
    }
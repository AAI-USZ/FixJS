function() {
        this.room.reset();
        this.location = this.start_location;
        this.move([0,0]);
        this.draw(this.context);
    }
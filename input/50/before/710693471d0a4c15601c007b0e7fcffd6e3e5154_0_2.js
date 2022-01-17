function(delta) {
        this._super(delta);
        if (this.outOfBounds(200)) {
            this.alive = false;
        }
    }
function(delta) {
        this._super(delta);
        if (this.outOfBounds(this.outOfBoundsKill)) {
            this.alive = false;
        }
    }
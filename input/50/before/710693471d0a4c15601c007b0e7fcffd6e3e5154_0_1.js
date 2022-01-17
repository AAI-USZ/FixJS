function(options) {
        this._super(options);
        this.on('collision:bullet:player', this.onHit);
    }
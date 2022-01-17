function (dt) {
        this._ticks++;

        cc.Log("schedUpdate: " + dt.toFixed(2));
        if (this._ticks > 3) {
            this._interval += 1.0;
            this.schedule(this.schedUpdate, this._interval);
            this._ticks = 0;
        }
    }
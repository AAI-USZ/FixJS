function (dt) {
        if (this._firstTick) {
            this._firstTick = false;
            this._elapsed = 0;
        }
        else {
            this._elapsed += dt;
        }
        //this.update((1 > (this._elapsed / this._duration)) ? this._elapsed / this._duration : 1);
        this.update(Math.max(0, Math.min(1, this._elapsed / Math.max(this._duration, cc.FLT_EPSILON))));
    }
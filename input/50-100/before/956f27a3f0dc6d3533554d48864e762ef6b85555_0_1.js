function (dt) {
        if (this._firstTick) {
            this._firstTick = false;
            this._elapsed = 0;
        }
        else {
            this._elapsed += dt;
        }
        this.update((1 > (this._elapsed / this._duration)) ? this._elapsed / this._duration : 1);
    }
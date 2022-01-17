function (time1) {
        time1 *= 2;
        if (time1 < 1) {
            this._other.update(0.5 * Math.pow(time1, this._rate));
        } else {
            this._other.update(1.0 - 0.5 * Math.pow(2 - time1, this._rate));
        }
    }
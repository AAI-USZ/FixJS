function (time1) {

        var sign = 1;
        var r = this._rate;

        if (r % 2 == 0) {
            sign = -1;
        }

        time1 *= 2;
        if (time1 < 1) {
            this._other.update(0.5 * Math.pow(time1, this._rate));
        } else {
            this._other.update(sign * 0.5 * (Math.pow(time1 - 2, this._rate) + sign * 2));
        }

    }
function (t, sx, sy) {
        var ret = false;

        if (this._super(t)) {
            this._endSkewX = sx;
            this._endSkewY = sy;

            ret = true;
        }

        return ret;
    }
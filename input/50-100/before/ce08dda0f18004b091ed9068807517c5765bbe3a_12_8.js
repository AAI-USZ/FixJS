function (t, deltaSkewX, deltaSkewY) {
        var ret = false;

        if (this._super(t, deltaSkewX, deltaSkewY)) {
            this._skewX = deltaSkewX;
            this._skewY = deltaSkewY;

            ret = true;
        }

        return ret;
    }
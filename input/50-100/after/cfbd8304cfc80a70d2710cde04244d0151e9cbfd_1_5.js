function (t, deltaSkewX, deltaSkewY) {
        var ret = false;

        if (cc.SkewTo.prototype.initWithDuration.call(this, t, deltaSkewX, deltaSkewY)) {
            this._skewX = deltaSkewX;
            this._skewY = deltaSkewY;

            ret = true;
        }

        return ret;
    }
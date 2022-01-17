function (t, sx, sy) {
        var ret = false;

        if (cc.ActionInterval.prototype.initWithDuration.call(this,t)) {
            this._endSkewX = sx;
            this._endSkewY = sy;

            ret = true;
        }

        return ret;
    }